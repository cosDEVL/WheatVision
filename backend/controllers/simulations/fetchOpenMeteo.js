const fs = require('fs');
const {getSeasonDates} = require('./seasonDates');

function weekIteratorMax(value){

    let maxValueWeek= [];

    for (let i = 0; i < value.length; i += 7){
        let weekValues = value.slice(i, i+7);
        let weekValuesReduced = weekValues.reduce((a, b) => Math.max(a, b), -Infinity);
        maxValueWeek.push(weekValuesReduced);
    }    

        return maxValueWeek;

}

function weekIteratorMin(value){

    let minValueWeek= [];

    for (let i = 0; i < value.length; i += 7){
        let weekValues = value.slice(i, i+7);
        let weekValuesReduced = weekValues.reduce((a, b) => Math.min(a, b), +Infinity);
        minValueWeek.push(weekValuesReduced);
    }    

        return minValueWeek;

}

function weekMeanIterator(value){

    let meanValueWeek= [];

    for (let i = 0; i < value.length; i += 7){
        let weekValues = value.slice(i, i+7);
        let weekValuesSum = weekValues.reduce((a, b) => a + b, 0);

        meanValueWeek.push(parseFloat((weekValuesSum / weekValues.length).toFixed(2)));
    }    

        return meanValueWeek;

}

function weekPrecipitationsIterator(value) {

    let sumValueWeek= [];

    for (let i = 0; i < value.length; i += 7){
        let weekValues = value.slice(i, i+7);

        sumValueWeek.push(parseFloat(weekValues.reduce((a, b) => a + b, 0).toFixed(2)));
    }    

        return sumValueWeek;

}

async function meteoData(seasonsDates, yearSeason, path) {

    let templateJson = [];

    for (const [key, value] of Object.entries(seasonsDates)) {

        const [startDate, endDate] = value

        await fetch(`https://historical-forecast-api.open-meteo.com/v1/forecast?latitude=41.4584&longitude=15.5519&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_mean,temperature_2m_min,relative_humidity_2m_max,relative_humidity_2m_mean,relative_humidity_2m_min,precipitation_sum`)
        .then((response) => response.json())
        .then((response) => {

            let daily = response.daily;

            let precipitationSum = weekPrecipitationsIterator(daily.precipitation_sum);
            let maxTemp = weekIteratorMax(daily.temperature_2m_max);
            let meanTemp = weekMeanIterator(daily.temperature_2m_mean);
            let minTemp = weekIteratorMin(daily.temperature_2m_min);
            let maxHumidity = weekIteratorMax(daily.relative_humidity_2m_max);
            let meanHumidity = weekMeanIterator(daily.relative_humidity_2m_mean);
            let minHumidity = weekIteratorMin(daily.relative_humidity_2m_min);

            let template = {
                yearRef: yearSeason,
                month: `${key}`,
                startDate: startDate,
                endDate: endDate,
                precipitationSum: precipitationSum,
                maxTemp: maxTemp,
                minTemp: minTemp,
                meanTemp: meanTemp,
                maxHumidity: maxHumidity,
                minHumidity: minHumidity,
                meanHumidity: meanHumidity
            };

            templateJson.push(template);
        })
    }


        await fs.writeFileSync(path, JSON.stringify(templateJson), 'utf-8');
        console.log("Saved");
        
     }


async function templateData(year, path) {

    const [yearSeason, seasonsDates] = getSeasonDates(year);

        let seasonsTemplateData = fs.readFileSync(path, 'utf-8');
        let data = JSON.parse(seasonsTemplateData);
        
        if (data.length > 0 && data[0].yearRef[0] === yearSeason[0]) {
            
            console.log("Meteo data retrieved");
            return(data);
        }
        else {
            await meteoData(seasonsDates, yearSeason, path);
            await templateData(year, path);
            console.log("Meteo data changed");
        }
}


 
module.exports = { meteoData, templateData };
 
 