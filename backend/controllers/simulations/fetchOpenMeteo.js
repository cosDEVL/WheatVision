const fs = require('fs');
const {getSeasonDates} = require('./seasonDates');
const {generateWeather} = require('./wheaterGeneration/generateWeather');

const precipitation_probability = {
    "January": {"mean": 0.225, "variance": 0.0425},
    "February": {"mean": 0.225, "variance": 0.0425},
    "March": {"mean": 0.1925, "variance": 0.0218},
    "April": {"mean": 0.1925, "variance": 0.0218},
    "May": {"mean": 0.1925, "variance": 0.0218},
    "June": {"mean": 0.124, "variance": 0.0904},
    "July": {"mean": 0.124, "variance": 0.0904},
    "August": {"mean": 0.124, "variance": 0.0904},
    "September": {"mean": 0.2075, "variance": 0.1268},
    "October": {"mean": 0.2075, "variance": 0.1268},
    "November": {"mean": 0.2075, "variance": 0.1268},
    "December": {"mean": 0.225, "variance": 0.0425},
}

const precipitationAvg = {
    "January": 54,
    "February": 46,
    "March": 54,
    "April": 55,
    "May": 38,
    "June": 29,
    "July": 23,
    "August": 21,
    "September": 39,
    "October": 47,
    "November": 56,
    "December": 60,
}

const margin = {
    "January": 2,
    "February": 3,
    "March": 3,
    "April": 4,
    "May": 4,
    "June": 5,
    "July": 5,
    "August": 5,
    "September":4,
    "October": 3,
    "November": 2,
    "December": 2,
}


function calcMeanValue(array){

    return parseFloat((array.reduce((a, b) => a + b, 0) / array.length).toFixed(2));

}

async function meteoData(seasonsDates, yearSeason, path) {

    let templateJson = [];

    try {
        
        for (const [key, value] of Object.entries(seasonsDates)) {

        const [startDate, endDate] = value;

        const response = await fetch(`https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=41.4584&longitude=15.5519&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_mean,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_mean,relative_humidity_2m_min,precipitation_sum`)
        const data = await response.json();

        if(!data || !data.daily) {
            console.error(`Errore: dati non validi per ${key} - ${startDate} - ${endDate}`);
            continue;
        }

        const daily = data.daily;

            let template = {
                yearRef: yearSeason,
                month: `${key}`,
                startDate: startDate,
                endDate: endDate,
                precipitationAvgRef: precipitationAvg[`${key}`],
                precipitation_probability: precipitation_probability[`${key}`],
                precipitationSum: daily.precipitation_sum,
                minTemp: calcMeanValue(daily.temperature_2m_min) - margin[`${key}`],
                maxTemp: calcMeanValue(daily.temperature_2m_max) + margin[`${key}`],
                meanTemp: daily.temperature_2m_mean,
                minHumidity: calcMeanValue(daily.relative_humidity_2m_min) - margin[`${key}`],
                maxHumidity: calcMeanValue(daily.relative_humidity_2m_max) + margin[`${key}`],
                meanHumidity: daily.relative_humidity_2m_mean
            };

            templateJson.push(template);
        }

        fs.writeFileSync(path, JSON.stringify(templateJson, null, 1), 'utf-8');
        console.log("Saved");
        
        return templateJson;

    } catch (error) {
        console.error(error);
        throw error;
    }
        
    }


async function templateData(year, path) {
    console.log("1");
    const [yearSeason, seasonsDates] = getSeasonDates(year);
console.log("2");
    let data;
    console.log("3");
    try {
        console.log("4");
        const raw = fs.readFileSync(path, 'utf-8');
        console.log("5");
        data = JSON.parse(raw);
        console.log("6");
    } catch (err) {

        data = []; // file non esistente o non leggibile
    }

    console.log("7");
    if (data.length === 0 || data[0].yearRef[0] !== yearSeason[0]) {
        console.log("8");
        // genera nuovi dati se non esistono o non aggiornati
        data = await meteoData(seasonsDates, yearSeason, path);
        console.log("9");
    }
    console.log("10");

    return generateWeather(data);
}



 
module.exports = { templateData };
 
 