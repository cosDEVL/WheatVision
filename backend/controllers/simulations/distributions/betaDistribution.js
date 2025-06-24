const { randomBeta } = require('d3-random');


function calcBetaRandom(mean, variance) {

    const common = Math.abs(((mean * (1 - mean)) / variance) - 1);


    const alpha = mean * common;
    const beta = Math.abs((1 - mean) * common);


    return parseFloat((randomBeta(alpha, beta)()).toFixed(2));

}   



module.exports = { calcBetaRandom };