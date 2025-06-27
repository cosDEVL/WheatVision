const { templateTeoreticPerPhase } = require('../templates/templateRef');
const { templateYieldData } = require('../templates/templateYieldData');
const { yieldTemplateSimulationPerPhase } = require('../templates/templateSimulation');


function datesDistributionPhase(startSowingDate, density, weatherGenerated) {

    const [year, month, day] = startSowingDate.split('-');
    const initialDate = new Date(`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
    let currentDate = new Date(initialDate);

    for (let i = 0; i < yieldTemplateSimulationPerPhase.length; i++) {

        let idxTemplateStart;
        let idxTemplateEnd;

        for (let j = 0; j < weatherGenerated.length; j++) {

            let startDateTemplate = new Date(weatherGenerated[j].startDate);
            let endDateTemplate = new Date(weatherGenerated[j].endDate);

            if (currentDate >= startDateTemplate && currentDate <= endDateTemplate) idxTemplateStart = j;

        }

        const startPeriodGenerated = weatherGenerated[idxTemplateStart];
        let endPeriodGenerated = null;

        let days = templateTeoreticPerPhase[i].durationRef[0];

        if (density >= 450) days += 4;
        else if (density >= 350) days += 2;        

        const tempRef = templateTeoreticPerPhase[i].tempMeanRef;
        const humidityRef = templateTeoreticPerPhase[i].humidityMeanRef;
        const precipPercentRef = templateTeoreticPerPhase[i].precipitationMeanRef;

        const theoreticalPrecipitations = templateYieldData.theoreticalData.theoreticalPrecipitations;
        

        let precipRef = [];

        for (let j = 0; j < precipPercentRef.length; j++) {
            precipRef.push((precipPercentRef[j] * theoreticalPrecipitations) / templateTeoreticPerPhase[i].durationRef[j]);
        }


        const optimalTempMean = tempRef.reduce((a, b) => a + b, 0) / tempRef.length;
        const optimalHumidityMean = humidityRef.reduce((a, b) => a + b, 0) / humidityRef.length;
        const optimalPrecipMean = (precipRef.reduce((a, b) => a + b, 0) / precipRef.length); 


        const maxTempDev = tempRef[1] - optimalTempMean;
        const maxHumidityDev = humidityRef[1] - optimalHumidityMean;
        const maxPrecipDev = Math.abs(precipRef[1] - optimalPrecipMean);


        const startDayIdx = currentDate.getDate() - 1;

        let slicedTempMean = startPeriodGenerated.meanTemp.slice(startDayIdx);
        let slicedHumidityMean = startPeriodGenerated.meanHumidity.slice(startDayIdx);
        let slicedPrecipSum = startPeriodGenerated.precipitationSum.slice(startDayIdx);

        if (days > slicedTempMean.length) {
            endPeriodGenerated = weatherGenerated[idxTemplateStart + 1];
            slicedTempMean = slicedTempMean.concat(endPeriodGenerated.meanTemp);
            slicedHumidityMean = slicedHumidityMean.concat(endPeriodGenerated.meanHumidity);
            slicedPrecipSum = slicedPrecipSum.concat(endPeriodGenerated.precipitationSum);

        }


        const meanTemp = slicedTempMean.reduce((a, b) => a + b, 0) / slicedTempMean.length;
        const meanHumidity = slicedHumidityMean.reduce((a, b) => a + b, 0) / slicedHumidityMean.length;
        const meanPrecipitation = slicedPrecipSum.reduce((a, b) => a + b, 0) / slicedPrecipSum.length;
        

        let tempFactor = 1 - Math.exp( -(Math.pow(Math.abs(meanTemp - optimalTempMean), 2) / (2 * maxTempDev)));
        let humidityFactor = 1 - Math.exp( -(Math.pow(Math.abs(meanHumidity - optimalHumidityMean), 2) / (2 * maxHumidityDev)));
        let precipFactor = 1 - Math.exp( -(Math.pow(Math.abs(meanPrecipitation - optimalPrecipMean), 2) / (2 * maxPrecipDev)));

        let climaticFactor = (tempFactor + humidityFactor + precipFactor) / 3;

        let newDays = Math.round(days + (days * climaticFactor));

        const phaseDurantion = yieldTemplateSimulationPerPhase[i].duration;
        phaseDurantion.days = newDays;

        const startDate = new Date(currentDate);
        const endDate = new Date(currentDate);

        endDate.setDate(currentDate.getDate() + newDays - 1);

        const formatData = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;

        phaseDurantion.startDate = formatData(startDate);
        phaseDurantion.endDate = formatData(endDate);

        currentDate.setDate(currentDate.getDate() + newDays);


    }

}

async function testSimulation(duration, i, weatherGenerated){

    let {days, startDate, endDate} = duration;
    let date1 = new Date(startDate);
    let date2 = new Date(endDate);

    let idxTemplateStart;
    let idxTemplateEnd;

    for (let j = 0; j < weatherGenerated.length; j++) {

        let startDateTemplate = new Date(weatherGenerated[j].startDate);
        let endDateTemplate = new Date(weatherGenerated[j].endDate);

        if (date1 >= startDateTemplate && date1 <= endDateTemplate) idxTemplateStart = j;
        if (date2 >= startDateTemplate && date2 <= endDateTemplate) idxTemplateEnd = j;

    } 

    let startDateTemplate = new Date(weatherGenerated[idxTemplateStart].startDate);
    let endDateTemplate = new Date(weatherGenerated[idxTemplateEnd].endDate);

    let temp = [];
    let humdity = [];
    let precipitations = [];

    for (let i = idxTemplateStart; i <= idxTemplateEnd; i++) {
        temp = temp.concat(weatherGenerated[i].meanTemp);
        humdity = humdity.concat(weatherGenerated[i].meanHumidity);
        precipitations = precipitations.concat(weatherGenerated[i].precipitationSum);
    }


    let startDayidx = date1.getDate() - 1;

    temp = temp.slice(startDayidx, startDayidx + days);
    humdity = humdity.slice(startDayidx, startDayidx + days);
    precipitations = precipitations.slice(startDayidx, startDayidx + days);

    yieldTemplateSimulationPerPhase[i].tempSimulated = temp;
    yieldTemplateSimulationPerPhase[i].humiditySimulated = humdity;
    yieldTemplateSimulationPerPhase[i].precipSimulated = precipitations;


    yieldTemplateSimulationPerPhase[i].precipitationSum = parseFloat((precipitations.reduce((a,b) => a+b, 0)));
    yieldTemplateSimulationPerPhase[i].tempMean = parseFloat((temp.reduce((a,b) => a+b, 0) / temp.length).toFixed(2));
    yieldTemplateSimulationPerPhase[i].humidityMean = parseFloat((humdity.reduce((a,b) => a+b, 0) / humdity.length).toFixed(2));

}


async function processPhase(sowingDate, density, weatherGenerated) {

    datesDistributionPhase(sowingDate, density, weatherGenerated);
    

    for (let i = 0; i < yieldTemplateSimulationPerPhase.length; i++){
        await testSimulation(yieldTemplateSimulationPerPhase[i].duration, i, weatherGenerated);   
    }

    return weatherGenerated;

}

module.exports = {processPhase};


