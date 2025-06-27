const { templateYieldData } = require('../templates/templateYieldData');
const { templateTeoreticTotal } = require('../templates/templateRef');


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

    //let nitrogenBeta = calcBetaRandom(nitrogenOptimal, nitrogenRange[0], nitrogenRange[1]);
    //let phosphorusBeta = calcBetaRandom(phosphorusOptimal, phosphorusRange[0], phosphorusRange[1]);
    //let potassiumBeta = calcBetaRandom(potassiumOptimal, potassiumRange[0], potassiumRange[1]);


    return [
        parseFloat((nitrogenOptimal * theoreticalYield).toFixed(2)),
        parseFloat((phosphorusOptimal * theoreticalYield).toFixed(2)),
        parseFloat((potassiumOptimal * theoreticalYield).toFixed(2))
    ];


}


function calcTheroreticalPrecipitations(density){

    let precipitationsTheor;

    if (density <= 250) precipitationsTheor = 400;
    else if (density <= 350) precipitationsTheor = 450;
    else if (density === 400) precipitationsTheor = 500;
    else if (density === 450) precipitationsTheor = 550;
    else if (density <= 550) precipitationsTheor = 600;

    return precipitationsTheor;

}


async function calcTheroreticalData( density, tkw, germinability, sowingRate ){

    
    const tilleringIndex = templateYieldData.theoreticalData.tilleringIndex;
    const spikeletsIndex = templateYieldData.theoreticalData.spikeletsIndex;
    const seedsIndex = templateYieldData.theoreticalData.seedsIndex;

    let theoreticalYield = sowingRate * germinability * tilleringIndex * spikeletsIndex * seedsIndex;
    theoreticalYield = parseFloat(theoreticalYield.toFixed(2))

    let totalNutrients = calcTheroreticalNutrients(theoreticalYield, density);
    let totalPrecipitations = calcTheroreticalPrecipitations(density);

    calcTheroreticalNutrients( theoreticalYield, density );
    assingTheoreticalData( density, tkw, germinability, spikeletsIndex, seedsIndex, sowingRate, tilleringIndex, theoreticalYield, totalNutrients, totalPrecipitations );

}



module.exports = { calcTheroreticalData };