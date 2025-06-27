const {calcNormalDistribution} = require('../distributions/normalDistribution');
const {calcBernoulliDistribution} = require('../distributions/bernoulliDistribution');
const {calcGammaDistribution} = require('../distributions/gammaDistribution');



function calcPrecipitations(precipitation_probability_mean, precipitation_probability_variance, precipitationSumTemplate) {

    const precipitationSum_mean = precipitationSumTemplate.reduce((a, b) => a + b, 0) / precipitationSumTemplate.length;
    const precipitationSum_variance = precipitationSumTemplate.reduce((acc, val) => acc + Math.pow((val - precipitationSum_mean), 2), 0) / precipitationSumTemplate.length;

    const gammaShape = (Math.pow(precipitationSum_mean, 2) / precipitationSum_variance) * 10;
    const gammaScale = (precipitationSum_variance / precipitationSum_mean);

    let precipitationSum = [];

    for (let j = 0; j < precipitationSumTemplate.length; j++){

        const precipProb = calcBernoulliDistribution(calcNormalDistribution(precipitation_probability_mean, Math.sqrt(precipitation_probability_variance), 0, 1));
        if (precipProb === 1) precipitationSum.push(calcGammaDistribution(gammaShape, gammaScale));
        else precipitationSum.push(0);
        
        //precipitationSum.push(calcGammaDistribution(gammaShape, gammaScale));
    }

        return precipitationSum;
}

function calcTemp(tempMeanTemplate, tempMinTemplate, tempMaxTemplate) {

    const tempMean = tempMeanTemplate.reduce((a, b) => a+b, 0) / tempMeanTemplate.length;
    const tempVariance = tempMeanTemplate.reduce((acc, val) => acc + Math.pow((val - tempMean), 2), 0) / tempMeanTemplate.length;

    let meanTemp = [];

    let temp = calcNormalDistribution(tempMean, Math.sqrt(tempVariance), tempMinTemplate, tempMaxTemplate);
    let lastTemp = temp;
    meanTemp.push(lastTemp);

    for (let i = 1; i < tempMeanTemplate.length; i++) {
        temp = calcNormalDistribution(lastTemp, Math.sqrt(tempVariance), tempMinTemplate, tempMaxTemplate);
        lastTemp = temp;
        meanTemp.push(lastTemp);
    }

    return meanTemp;
}

function calcHumidity(humidityMeanTemplate, himdityMinTemplate, humidityMaxTemplate) {

    const humidityMean = humidityMeanTemplate.reduce((a, b) => a+b, 0) / humidityMeanTemplate.length;
    const humidityVariance = humidityMeanTemplate.reduce((acc, val) => acc + Math.pow((val - humidityMean), 2), 0) / humidityMeanTemplate.length;

    let meanHumidity = [];

    let humidity = calcNormalDistribution(humidityMean, Math.sqrt(humidityVariance), himdityMinTemplate, humidityMaxTemplate);
    let lastHumidity = humidity;
    meanHumidity.push(parseInt(lastHumidity));

    for (let i = 1; i < humidityMeanTemplate.length; i++) {
        humidity = calcNormalDistribution(lastHumidity, Math.sqrt(humidityVariance), himdityMinTemplate, humidityMaxTemplate);
        lastHumidity = humidity;
        meanHumidity.push(parseInt(lastHumidity));
    }

    return meanHumidity;
}

function generateWeather(weatherTemplate) {

    const weatherGenerated = [];

    for (let i = 0; i < weatherTemplate.length; i++){
        const data = weatherTemplate[i];

        const precipitationSum = calcPrecipitations(data.precipitation_probability.mean, data.precipitation_probability.variance, data.precipitationSum);
        const meanTemp = calcTemp(data.meanTemp, data.minTemp, data.maxTemp);
        const meanHumidity = calcHumidity(data.meanHumidity, data.minHumidity, data.maxHumidity);

        weatherGenerated.push({
            yearRef: data.yearRef,
            month: data.month,
            startDate: data.startDate,
            endDate: data.endDate,
            precipitationAvgRef: data.precipitationAvgRef,
            precipitationSum: precipitationSum,
            meanTemp: meanTemp,
            meanHumidity: meanHumidity
        })

    

    }

    return weatherGenerated;

}


module.exports = {generateWeather};