const { templateYieldData } = require('../templates/templateYieldData');
const { templateTeoreticTotal, templateTeoreticPerPhase } = require('../templates/templateRef');
const { meteoData, templateData } = require('../fetchOpenMeteo');
const {getSeasonDates} = require('../seasonDates');

const {processPhase} = require('./templateSimulationFunctions');

const { calcBetaRandom } = require('../distributions/betaDistribution');


function assingTheoreticalData( density, tkw, germinability, spikeletsPerSpike, seedsPerSpikelet, sowingRate, tilleringIndex, theoreticalYield, totalNutrients, totalPrecipitations ) {

    
    const theoreticalData = templateYieldData.theoreticalData;

    theoreticalData.yieldCalculatedPerHectares = theoreticalYield;
    

    const [nitrogenTot, phosphorusTot, potassiumTot] = totalNutrients;

    theoreticalData.theoreticalNitrogen = nitrogenTot;
    theoreticalData.theoreticalPhosphorus = phosphorusTot;
    theoreticalData.theoreticalPotassium = potassiumTot;

    theoreticalData.theoreticalPrecipitations = totalPrecipitations;

}


function calcTheroreticalNutrients( theoreticalYield, density ){

    const nutrientsRef = templateTeoreticTotal.nutrientsTotalRef;

    const nitrogenRange = nutrientsRef.nitrogenTeoretical;
    const phosphorusRange = nutrientsRef.phosphorusTeoretical;
    const potassiumRange = nutrientsRef.potassiumTeoretical;
    
    let nitrogenOptimal;
    let phosphorusOptimal;
    let potassiumOptimal;

    if (density > 350) {
        nitrogenOptimal = nitrogenRange[1] - 0.45;
        phosphorusOptimal = phosphorusRange[1] - 0.45;
        potassiumOptimal = potassiumRange[1] - 0.45;
    } else {
        nitrogenOptimal = nitrogenRange[0] + 0.45;
        phosphorusOptimal = phosphorusRange[0] + 0.45;
        potassiumOptimal = potassiumRange[0] + 0.45;
    }

    let nitrogenBeta = calcBetaRandom(nitrogenOptimal, nitrogenRange[0], nitrogenRange[1]);
    let phosphorusBeta = calcBetaRandom(phosphorusOptimal, phosphorusRange[0], phosphorusRange[1]);
    let potassiumBeta = calcBetaRandom(potassiumOptimal, potassiumRange[0], potassiumRange[1]);


    return [
        parseFloat((nitrogenOptimal * theoreticalYield).toFixed(2)),
        parseFloat((phosphorusOptimal * theoreticalYield).toFixed(2)),
        parseFloat((potassiumOptimal * theoreticalYield).toFixed(2))
    ];


}


function calcTheroreticalPrecipitations(density){

    const precipitationRef = templateTeoreticTotal.precipitationTotalRef.precipitationTheoretical;
    const precipitationVar =  templateTeoreticTotal.precipitationTotalRef.precipitationTheoretical[2];

    let precipitationBeta;

    if (density <= 300) {
        let precipitationMax = precipitationRef[0] + precipitationVar;
        precipitationBeta = (precipitationRef[0] + precipitationMax) / 2;

    }
    else if (density <= 400) {
        let precipitationMin = precipitationRef[0] + precipitationVar - 35;
        let precipitationMax = precipitationRef[1] - precipitationVar + 35;
        precipitationBeta = (precipitationMin + precipitationMax) / 2;

    }
    else {
        let precipitationMin = precipitationRef[1] - precipitationVar;
        precipitationBeta = (precipitationMin + precipitationRef[1]) / 2;
    }


    return parseFloat(precipitationBeta.toFixed(2));

}


async function calcTheroreticalData( density, tkw, germinability, sowingRate, sowingDate ){

    let date = new Date(sowingDate);


    await templateData(date.getFullYear(), './controllers/simulations/templates/templateSeasons.json');

    const tilleringIndex = templateYieldData.theoreticalData.tilleringIndex;
    const spikeletsIndex = templateYieldData.theoreticalData.spikeletsIndex;
    const seedsIndex = templateYieldData.theoreticalData.seedsIndex;

    let theoreticalYield = sowingRate * germinability * tilleringIndex * spikeletsIndex * seedsIndex;
    theoreticalYield = parseFloat(theoreticalYield.toFixed(2))

    let totalNutrients = calcTheroreticalNutrients(theoreticalYield, density);
    let totalPrecipitations = calcTheroreticalPrecipitations(density);

    calcTheroreticalNutrients( theoreticalYield, density );
    assingTheoreticalData( density, tkw, germinability, spikeletsIndex, seedsIndex, sowingRate, tilleringIndex, theoreticalYield, totalNutrients, totalPrecipitations );

    await processPhase(sowingDate, density);

}



module.exports = { calcTheroreticalData };