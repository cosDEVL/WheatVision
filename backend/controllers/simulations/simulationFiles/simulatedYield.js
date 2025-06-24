const { calcTheroreticalData } = require('./theoreticalYield');
const { templateYieldData } = require('../templates/templateYieldData');
const { getSeasonDates } = require('../seasonDates');
const { yieldTemplateSimulationPerPhase } = require('../templates/templateSimulation');
const { templateTeoreticPerPhase } = require('../templates/templateRef');

const { processPhase } = require('./templateSimulationFunctions');


const { calcUniformRandom } = require('../distributions/uniformDistribution');
const { calcNormalDistribution } = require('../distributions/normalDistribution');
//const { generateWeather } = require('../wheaterGeneration/generateWeather');

//const [yearSeason, seasonsDates] = getSeasonDates(2021);

const { templateData } = require('../fetchOpenMeteo');

function assignGeneralData(density, tkw, germinability, sowingRate){

    const generalData = templateYieldData.generalData;

    generalData.density = density;
    generalData.TKW = tkw;
    generalData.germinability = germinability;
    generalData.sowingRate = sowingRate * 1000;


}

function assignSimulatedData (nitrogenInput, phosphorusInput, potassiumInput, precipitationTotSimulated) {

    const simulatedData = templateYieldData.simulatedData;

    simulatedData.simulatedNitrogen = parseFloat(nitrogenInput.toFixed(2));
    simulatedData.simulatedPhosphorus = parseFloat(phosphorusInput.toFixed(2));
    simulatedData.simulatedPotassium = parseFloat(potassiumInput.toFixed(2));
    simulatedData.simulatedPrecipitations = parseFloat(precipitationTotSimulated.toFixed(2));

}


function calcPercentVariation(simulatedData, theoreticalData, divisorFactor){

    let result = Math.max(0, 1 - Math.abs(((simulatedData - theoreticalData) / theoreticalData) / divisorFactor));

        return result > 0.2 ? result : 0.2;

}


function calcCoeffIndexs(nitrogenInput, phosphorusInput, potassiumInput, divisorFactor = 2){
    const theoreticalData = templateYieldData.theoreticalData;

    const nitrogen = theoreticalData.theoreticalNitrogen;
    const phosphorus = theoreticalData.theoreticalPhosphorus;
    const potassium = theoreticalData.theoreticalPotassium;

    const coeffNitrogen = calcPercentVariation(nitrogenInput, nitrogen, divisorFactor);
    const coeffPhosphorus = calcPercentVariation(phosphorusInput, phosphorus, divisorFactor);
    const coeffPotassium = calcPercentVariation(potassiumInput, potassium, divisorFactor);

    const theroreticalPrecipitationsTot = theoreticalData.theoreticalPrecipitations;

    
    let coeffPrecip = [];
    let coeffTemp = [];
    let coeffHumidity = [];
    

    for (let i = 0; i < templateTeoreticPerPhase.length; i++) {
        const simulatedPrecipitations = yieldTemplateSimulationPerPhase[i].precipitationSum;
        const theroreticalPrecipitationsMin = theroreticalPrecipitationsTot * templateTeoreticPerPhase[i].precipitationMeanRef[0];
        const theroreticalPrecipitationsMax = theroreticalPrecipitationsTot * templateTeoreticPerPhase[i].precipitationMeanRef[1];

        if (simulatedPrecipitations < theroreticalPrecipitationsMin) {
            
            coeffPrecip.push(calcPercentVariation(simulatedPrecipitations, theroreticalPrecipitationsMin, divisorFactor))
        } else if (simulatedPrecipitations > theroreticalPrecipitationsMax) {
            coeffPrecip.push(calcPercentVariation(simulatedPrecipitations, theroreticalPrecipitationsMax, divisorFactor))
        } else coeffPrecip.push(1);

        
        const tempTemplateRef = templateTeoreticPerPhase[i].tempMeanRef;
        const tempTemplateSimualted = yieldTemplateSimulationPerPhase[i].tempMean;
        

        if (tempTemplateSimualted < tempTemplateRef[0]) {
            coeffTemp.push(calcPercentVariation(tempTemplateSimualted, tempTemplateRef[0], divisorFactor));
        } else if (tempTemplateSimualted > tempTemplateRef[1]) {
            coeffTemp.push(calcPercentVariation(tempTemplateSimualted, tempTemplateRef[1], divisorFactor));
        } else coeffTemp.push(1);

        
        const humidityTemplateRef = templateTeoreticPerPhase[i].humidityMeanRef;
        const humidityTemplateSimualted = yieldTemplateSimulationPerPhase[i].humidityMean;

        if (humidityTemplateSimualted < humidityTemplateRef[0]) {
            coeffHumidity.push(calcPercentVariation(humidityTemplateSimualted, humidityTemplateRef[0], divisorFactor));
        } else if (humidityTemplateSimualted > humidityTemplateRef[1]) {
            coeffHumidity.push(calcPercentVariation(humidityTemplateSimualted, humidityTemplateRef[1], divisorFactor));
        } else coeffHumidity.push(1);

    }

    return {
        coeffNitrogen: coeffNitrogen,
        coeffPhosphorus: coeffPhosphorus,
        coeffPotassium: coeffPotassium,
        coeffPrecip: coeffPrecip,
        coeffTemp: coeffTemp,
        coeffHumidity: coeffHumidity
    }

}


async function startSimulation(hectares, density, tkw, germinability, nitrogenInput, phosphorusInput, potassiumInput, sowingDate){

    try {

        let date = new Date(sowingDate);
        
        const weatherGenerated = await templateData(date.getFullYear(), './controllers/simulations/templates/templateSeasons.json');
        
        console.log("11");

        let sowingRate = parseFloat((((density * tkw) / (germinability * 100) ) / 1000).toFixed(2));
        await calcTheroreticalData(density, tkw, germinability, sowingRate, sowingDate);

        await processPhase(sowingDate, density, weatherGenerated);

        console.log("12");

        let precipitationTotSimulated = 0;

        for (let i = 0; i < yieldTemplateSimulationPerPhase.length; i++){
            precipitationTotSimulated += yieldTemplateSimulationPerPhase[i].precipitationSum;
        }

        assignGeneralData(density, tkw, germinability, sowingRate);
        assignSimulatedData (nitrogenInput, phosphorusInput, potassiumInput, precipitationTotSimulated);
        
        const coeffIndexs = calcCoeffIndexs(nitrogenInput, phosphorusInput, potassiumInput);

        const yieldDataSim = templateYieldData.simulatedData;
        const yieldDataTheoric = templateYieldData.theoreticalData;

        let coeffGeometricMean = [];
        
        for (let i = 0; i < coeffIndexs.coeffPrecip.length; i++) {
            const temp = coeffIndexs.coeffTemp[i];
            const humidity = coeffIndexs.coeffHumidity[i];
            const precip = coeffIndexs.coeffPrecip[i];

            coeffGeometricMean.push(Math.pow((temp * humidity * precip), 1 / 3));

        }

        coeffGeometricMean.push(Math.pow((coeffIndexs.coeffNitrogen * coeffIndexs.coeffPhosphorus * coeffIndexs.coeffPotassium), 1 / 3));
        
        let germinabilitySim = germinability * coeffGeometricMean[0];
        let tilleringIndexSim = yieldDataTheoric.tilleringIndex * coeffGeometricMean[1];
        let spikeletsIndexSim = yieldDataTheoric.spikeletsIndex * coeffGeometricMean[2];
        let seedsIndexSim = yieldDataTheoric.seedsIndex * coeffGeometricMean[3];


        let effectiveYield = sowingRate * germinabilitySim * tilleringIndexSim * spikeletsIndexSim * seedsIndexSim * coeffGeometricMean[5];


        let hectolitreCoeff = Math.sqrt(coeffGeometricMean[4] * coeffGeometricMean[5]);
        let hectolitreMin = 76.00;
        let hectolitreMax = 82.00;
        let hectolitreMean;

        if (hectolitreCoeff <= 0.45)  hectolitreMean = hectolitreMin + 2;
        else if (hectolitreCoeff <= 0.75) hectolitreMean = (hectolitreMin + hectolitreMax) / 2;
        else hectolitreMean = hectolitreMax - 2;

        let hectolitreWeight = calcNormalDistribution(hectolitreMean, hectolitreCoeff, hectolitreMin, hectolitreMax);


        yieldDataSim.yieldSimulatedPerHectares = parseFloat(effectiveYield.toFixed(2));
        yieldDataSim.yieldSimulatedTotal = parseFloat((effectiveYield * hectares).toFixed(2))
        yieldDataSim.tilleringIndex = parseFloat(tilleringIndexSim.toFixed(2));
        yieldDataSim.spikeletsIndex = parseFloat(spikeletsIndexSim.toFixed(2));
        yieldDataSim.seedsIndex = parseFloat(seedsIndexSim.toFixed(2));
        yieldDataSim.hectolitreWeight = parseFloat(hectolitreWeight.toFixed(2));
        

        const finance = templateYieldData.financeData;

        if (hectolitreWeight >= 79.5) {
            finance.wheatType = "Frumento Duro Fino";
            finance.durumWheatPricePerTons = 317.5;
            
        }
        else if (hectolitreWeight >= 78.0) {
            finance.wheatType = "Frumento Duro Buon Mercantile";
            finance.durumWheatPricePerTons = 307.5;
        }
        if (hectolitreWeight >= 76.0) {
            finance.wheatType = "Frumento Duro Mercantile";
            finance.durumWheatPricePerTons = 295.5;
        }

        let wheatSeedPricePerHectares = 317.5 * sowingRate;
        let wheatSeedPriceTotal = wheatSeedPricePerHectares * hectares;
        let durumWheatPriceTotal = finance.durumWheatPricePerTons * (effectiveYield * hectares);

        finance.wheatSeedPricePerHectares = parseFloat(wheatSeedPricePerHectares.toFixed(2));
        finance.wheatSeedPriceTotal = parseFloat(wheatSeedPriceTotal.toFixed(2));
        finance.durumWheatPriceTotal = parseFloat(durumWheatPriceTotal.toFixed(2));

        console.log("13");

        return {
            templateYieldData,
            yieldTemplateSimulationPerPhase, 
            weatherGenerated
        }
            
    } catch (error) {
        console.log(error);
    }

    



    
}

/**
 * ettari
 * densità
 * tkw
 * germinabilità
 * azoto
 * fosforo
 * potassio
 * periodo di semina
 */
//startSimulation(100, 300, 60, 0.9, 21, 13, 16, `${yearSeason[0]}-12-10`);

module.exports = { startSimulation };