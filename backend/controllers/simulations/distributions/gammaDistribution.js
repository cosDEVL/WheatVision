const {randomGamma} = require('d3-random');


function calcGammaDistribution(shape, scale){

    return parseFloat((randomGamma(shape, scale)()).toFixed(1));

}

module.exports = {calcGammaDistribution};