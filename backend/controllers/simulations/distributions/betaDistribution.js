const { randomBeta } = require('d3-random');


function calcBetaRandom(optimalValue, minValue, maxValue){

    let relativeMean = (optimalValue - minValue) / (maxValue - minValue);
    const variance = 0.3;

    let common = (relativeMean * Math.abs( 1 - relativeMean )) / Math.abs(variance -1);

    let alpha = relativeMean * common;
    let beta = (1 - relativeMean) * common;

    

    const betaRand = randomBeta(alpha, beta)();
    

    return parseFloat((minValue + betaRand * (maxValue - minValue)).toFixed(2));

}   



module.exports = { calcBetaRandom };