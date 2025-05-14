const fs = require('fs');

const {templateTeoreticPerPhase, templateTeoreticTotal} = require('../templates/templateRef');
const {yieldTemplateSimulationPerPhase, yieldTemplateSimulationTotal} = require('../templates/templateSimulation');
const { templateSeasonsSimulated, seasonalStdDev } = require('../templates/templateSeasonsSimulated');

const {calcBetaRandom} = require('../distributions/betaDistribution');
const { calcNormalDistribution } = require('../distributions/normalDistribution');


function calcDaysPhase(density){

    let variance;

    if (density <= 350) variance = 3;
    else variance = 8;

    for (let i = 0; i < yieldTemplateSimulationPerPhase.length; i++) {
    
        const templatePhaseDuration = templateTeoreticPerPhase[i].durationRef;
        const simulatedPhaseDuration = yieldTemplateSimulationPerPhase[i].duration;
        let optimalPhaseDuration = templatePhaseDuration[0] + variance;

        let phaseDurationBeta = calcBetaRandom(optimalPhaseDuration, templatePhaseDuration[0], templatePhaseDuration[1]);

        simulatedPhaseDuration.days = parseInt(phaseDurationBeta);

    }
}

function dateDistributionPhase (startSowingDate) {

    const [year, month, day] = startSowingDate.split('-');
    const initialDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    let currentDate = new Date(initialDate);

    for(let i = 0; i < yieldTemplateSimulationPerPhase.length; i++) {

        const phaseDurantion = yieldTemplateSimulationPerPhase[i].duration;
        const phaseDays = phaseDurantion.days;

        const startDate = new Date(currentDate);
        const endDate = new Date(currentDate);

        endDate.setDate(currentDate.getDate() + phaseDays - 1);

        const formatData = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;

        phaseDurantion.startDate = formatData(startDate);
        phaseDurantion.endDate = formatData(endDate);

        currentDate.setDate(currentDate.getDate() + phaseDays);

    }

}

function smoothValue(current, previous, weight = 0.3) {
    return parseFloat((previous + (current - previous) * weight).toFixed(2));
  }

function simulateEnviromentData () {

    const seasonTemplateData = fs.readFileSync('./controllers/simulations/templates/templateSeasons.json', 'utf-8');
    const data = JSON.parse(seasonTemplateData);

    for (let i = 0; i < data.length; i++) {

        const weekJson = data[i];
        console.log(weekJson);
        const weeksLength = data[i].precipitationSum.length;
        const { precipitationSum, maxTemp, minTemp, meanTemp, maxHumidity, minHumidity, meanHumidity } = weekJson;

        
        const seasonsSimulated = templateSeasonsSimulated[i];
        let precipitationSimulated = [];
        let meanTempSimulated = [];
        let meanHumiditySimulated = [];
        

        for (let j = 0; j < weeksLength; j++) {

            let precipitationNormalDistr = calcNormalDistribution(precipitationSum[j], seasonalStdDev[i], 0);
            
            let meanTempBeta = calcBetaRandom(meanTemp[j], minTemp[j], maxTemp[j]);
            let meanTempNormal = calcNormalDistribution(meanTempBeta, seasonalStdDev[i], -5, 40);
            
            let meanHumidityBeta = calcBetaRandom(meanHumidity[j], minHumidity[j], maxHumidity[j]);
            let meanHumidityNormal = calcNormalDistribution(meanHumidityBeta, seasonalStdDev[i], 0, 100);
            

            if (j === 0) {
                
                precipitationSimulated.push(precipitationNormalDistr);
                meanTempSimulated.push(meanTempNormal);
                meanHumiditySimulated.push(meanHumidityNormal);
            } else {
                let smoothPrecipitation = smoothValue(precipitationNormalDistr, precipitationSimulated[j-1]);
                let smoothTempMean = smoothValue(meanTempNormal, meanTempSimulated[j-1]);
                let smoothHumidityMean = smoothValue(meanHumidityNormal, meanHumiditySimulated[j-1]);

                precipitationSimulated.push(smoothPrecipitation);
                meanTempSimulated.push(smoothTempMean);
                meanHumiditySimulated.push(smoothHumidityMean);
            }
        }
        seasonsSimulated.precipitationSum = precipitationSimulated;
        seasonsSimulated.meanTemp = meanTempSimulated;
        seasonsSimulated.meanHumidity = meanHumiditySimulated;
    }

    

}

async function testSimulation(duration, i){

    const seasonTemplateData = fs.readFileSync('./controllers/simulations/templates/templateSeasons.json', 'utf-8');
    const data = JSON.parse(seasonTemplateData);

    let {days, startDate, endDate} = duration;
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);

    let idxTemplateStart;
    let idxTemplateEnd;

    for (let j = 0; j < data.length; j++) {

        let startDateTemplate = new Date(data[j].startDate);
        let endDateTemplate = new Date(data[j].endDate);

        if (date1 >= startDateTemplate && date1 <= endDateTemplate) idxTemplateStart = j;
        if (date2 >= startDateTemplate && date2 <= endDateTemplate) idxTemplateEnd = j;

    } 

    let startDateTemplate = new Date(templateSeasonsSimulated[idxTemplateStart].startDate);
    let endDateTemplate = new Date(templateSeasonsSimulated[idxTemplateEnd].endDate);

    let precipTot = [];
    let tempTot = [];
    let humidityTot = [];
    
    for (let j = 0; j < templateSeasonsSimulated.length; j ++){

        let date1 = new Date(templateSeasonsSimulated[j].startDate);
        let date2 = new Date(templateSeasonsSimulated[j].endDate);

        if (date1 >= startDateTemplate && date2 <= endDateTemplate) {
            
            for (let x = 0; x < templateSeasonsSimulated[j].precipitationSum.length; x ++){
                precipTot.push(templateSeasonsSimulated[j].precipitationSum[x]);
                tempTot.push(templateSeasonsSimulated[j].meanTemp[x]);
                humidityTot.push(templateSeasonsSimulated[j].meanHumidity[x]);
            }    
        }
    }

    let newPrecipTot;
    let newTempTot;
    let newHumidityTot; 

    
    let idx1 = parseInt(date1.getDate() / 7);
    
    if (precipTot.length <= 5) {
        let idx2 = (parseInt(date2.getDate() / 7));

        newPrecipTot = precipTot.slice(idx1, idx2+1);
        newTempTot = tempTot.slice(idx1, idx2+1);
        newHumidityTot = humidityTot.slice(idx1, idx2+1);
    }
        else {

        let lengthArr = templateSeasonsSimulated[idxTemplateEnd].precipitationSum.length;
        let idx2 = lengthArr - (parseInt(date2.getDate() / 7)) -1;
        idx2 = precipTot.length - idx2;

        newPrecipTot = precipTot.slice(idx1, idx2+1);
        newTempTot = tempTot.slice(idx1, idx2+1);
        newHumidityTot = humidityTot.slice(idx1, idx2+1);

    }

    yieldTemplateSimulationPerPhase[i].precipitationSum = parseFloat((newPrecipTot.reduce((a,b) => a+b, 0)).toFixed(2));
    yieldTemplateSimulationPerPhase[i].tempMean = parseFloat((newTempTot.reduce((a,b) => a+b, 0) / newTempTot.length).toFixed(2));
    yieldTemplateSimulationPerPhase[i].humidityMean = parseFloat((newHumidityTot.reduce((a,b) => a+b, 0) / newHumidityTot.length).toFixed(2));

}


async function processPhase(sowingDate, density) {

    calcDaysPhase(density);
    dateDistributionPhase(sowingDate);
    simulateEnviromentData();

    for (let i = 0; i < yieldTemplateSimulationPerPhase.length; i++){
        await testSimulation(yieldTemplateSimulationPerPhase[i].duration, i);   
    }

}

module.exports = {processPhase};


