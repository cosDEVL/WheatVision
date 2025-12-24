const Random = require('d3-random');

const normalDistribution = (mean, stdDev, min = undefined, max = undefined) => {
    let value;

        do {
            value = Random.randomNormal(mean, stdDev)();
        } while (value < min || value > max);

    return parseFloat(value.toFixed(2));
}

const betaDistribution = (mean, variance) => {
    
    let alpha = mean * (((mean * (1 - mean)) / variance) - 1);
    let beta = (1 - mean) * (((mean * (1 - mean)) / variance) - 1);

    return parseFloat((Random.randomBeta(alpha, beta)()).toFixed(2));

}

const uniformDistribution = (min, max) => {
    return parseFloat((Random.randomUniform(min, max)()).toFixed(2));
}

const bernoulliDistribution = (p) => {
    return Random.randomBernoulli(p)();
}

const gammaDistribution = (shape, scale) => {
    return parseFloat((Random.randomGamma(shape, scale)()).toFixed(1));
}

module.exports = { normalDistribution, betaDistribution, uniformDistribution, bernoulliDistribution, gammaDistribution };