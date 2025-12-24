const fs = require('fs').promises;

const path = require('path');
const { getSeasonDates } = require('./helpers/seasonDates');
const CONFIG = require('./config/weatherConfig');

const calcMeanValue = (array) => {
    if (!array || array .length === 0) return 0;
    return parseFloat((array.reduce((a, b) => a + b, 0) / array.length).toFixed(2));
}


// Funzione che esegue il fetch dei dati da OpenMeteo
const fetchMonthlyData = async (startDate, endDate) => {
    const { latitude, longitude } = CONFIG.apiLocation;
    const url = `https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=41.4584&longitude=15.5519&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_mean,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_mean,relative_humidity_2m_min,precipitation_sum`;
    const response = await fetch(url);
    
    const data = await response.json();
    if (!data || !data.daily) {
        throw new Error(`Dati meteo non validi per l'intervallo ${startDate} - ${endDate}`);
    }

    return data.daily;

}

// Funzione che crea il template e lo salva nel JSON file
const buildAndCacheTemplate = async (seasonDates, yearSeason, filePath) => {
    const templateJson = [];

    for (const [month, dates] of Object.entries(seasonDates)) {

        const [startDate, endDate] = dates;
        const daily = await fetchMonthlyData(startDate, endDate);
        
        templateJson.push({
            yearRef: yearSeason,
            month,
            startDate, 
            endDate,
            precipitation_probability: CONFIG.precipitation_probability[month],
            precipitationSum: daily.precipitation_sum,
            minTemp: calcMeanValue(daily.temperature_2m_min) - CONFIG.margin[month],
            maxTemp: calcMeanValue(daily.temperature_2m_max) + CONFIG.margin[month],
            meanTemp: daily.temperature_2m_mean,
            minHumidity: calcMeanValue(daily.relative_humidity_2m_min) - CONFIG.margin[month],
            maxHumidity: calcMeanValue(daily.relative_humidity_2m_max) + CONFIG.margin[month],
            meanHumidity: daily.relative_humidity_2m_mean
        });
    }

    await fs.writeFile(filePath, JSON.stringify(templateJson, null, 2), 'utf-8');
    console.log(`Template Meteo salvato in cache: ${filePath}`)
    return templateJson;

}

// Funzione per recuperare il JSON oppure riscriverlo
const getTemplateData = async (year) => {
    const [yearSeason, seasonDates] = getSeasonDates(year);

    const cachePath = path.join(__dirname, "..", "data", "templateSeasons.json");

    try {
        const rawData = await fs.readFile(cachePath, 'utf-8');
        const data = JSON.parse(rawData);

        // Verifica se templateSeasons.json e' popolato e se la prima propireta' corrisponde all'anno yearSeason. 
        // Se e' cosi' ritorna il template, altriemnti viene riscritto.
        if (data.length > 0 && data[0].yearRef[0] === yearSeason[0]) {
            console.log(`Template meteo caricato nella cache: ${cachePath}`);
            return data;
        }

    } catch (error) {
        // L'errore sotto indica che non e' stato trovato il file specificato nel percorso della directory
        if (error.code !== "ENOENT") {
            console.warn("Errore nella lettura della cache. Il file verrà rigenerato:", error);
        }
    }
    let newTemplate = await buildAndCacheTemplate(seasonDates, yearSeason, cachePath);
    return newTemplate

}


module.exports = { getTemplateData };