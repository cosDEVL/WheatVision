const { normalDistribution, bernoulliDistribution, gammaDistribution } = require('./helpers/calcDistributions');
const random = require('d3-random');

// questa funzione andra' a calcolare a partire dall'array di valori passati come parametro 
// di calcolare la media e la varianza di quel dato array
const getStats = (arr) => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    const variance = arr.reduce((acc, val) => acc + Math.pow((val - mean), 2), 0) / arr.length;

    return { mean, variance };
};

// questa funzione andra' a calcolare, grazie alla Distribuzione Bernoulli e Gamma le precipitazioni
function calcPrecipitations(probMean, probVariance, sumTemplate) {
    const { mean, variance } = getStats(sumTemplate);

    if (variance === 0) {
        return sumTemplate.map(() => 0);
    }

    const gammaShape = Math.pow(mean, 2) / variance;
    const gammaScale = variance / mean;

    return sumTemplate.map(() => {
        const hasPrecipitation = bernoulliDistribution(normalDistribution(probMean, Math.sqrt(probVariance), 0, 1));
        return hasPrecipitation ? gammaDistribution(gammaShape, gammaScale) : 0;

    });
}

// questa funzione, attraverso la distribuzione Normale, simulera' le temperature e umidita' rimanendo pero' 
// in un dato range di valori che verranno passati sempre come parametro
function generateSeries (template, min, max) {
    const { mean, variance } = getStats(template);
    const stdDev = Math.sqrt(variance);
    let series = [];

    for (let i = 0; i < template.length; i++) {
        const previousDayInfluence = i > 0 ? (series[i-1] - mean) * 0.3 : 0;
        const dailyMean = mean + previousDayInfluence;

        value = normalDistribution(dailyMean, stdDev, min, max);
        series.push(value);
    }

    return series;

}

function generateWeather(weatherTemplate) {
    return weatherTemplate.map(data => {
        const precipSimulated = calcPrecipitations(data.precipitation_probability.mean, data.precipitation_probability.variance, data.precipitationSum);
        const tempSimulated = generateSeries(data.meanTemp, data.minTemp, data.maxTemp);
        const humiditySimulated = generateSeries(data.meanHumidity, data.minHumidity, data.maxHumidity);

        return {
            yearRef: data.yearRef,
            month: data.month,
            duration: { startDate: data.startDate, endDate: data.endDate },
            precipSimulated,
            tempSimulated,
            humiditySimulated
        }
    })
}

module.exports = { generateWeather };