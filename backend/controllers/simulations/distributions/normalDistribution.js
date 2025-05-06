const { randomNormal } = require('d3-random');

function calcNormalDistribution(mean, stdDev, min, max = undefined){
    let value;
    if (!max) {
        do {
            value = randomNormal(mean, stdDev)();
        } while (value < min)

    } else {
        do {
            value = randomNormal(mean, stdDev)();
        } while (value < min || value > max)
    }    
    return parseFloat(value.toFixed(2));
}

module.exports = { calcNormalDistribution };