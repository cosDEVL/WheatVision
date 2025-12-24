const SIMULATION_REF_DATA = {
    phenologicalPhases: [
        {
        phase: 'Germinazione',
        durationRef: [7, 20], 
        tempMeanRef: [0, 15],
        humidityMeanRef: [50, 80],
        precipitationMeanRef: [0.05, 0.1] // 20mm -- 40mm
    },
    {
        phase: 'Accestimento',
        durationRef: [30, 50], 
        tempMeanRef: [0, 15],
        humidityMeanRef: [45, 75],
        precipitationMeanRef: [0.25, 0.325] // 100mm -- 130mm
    },
    {
        phase: 'Levata',
        durationRef: [25, 40], 
        tempMeanRef: [10, 25],
        humidityMeanRef: [40, 70],
        precipitationMeanRef: [0.325, 0.375] // 130mm -- 150mm
    },
    {
        phase: 'Spigatura e Fioritura',
        durationRef: [25, 40], 
        tempMeanRef: [15, 25],
        humidityMeanRef: [30, 60],
        precipitationMeanRef: [0.35, 0.5] // 140mm -- 200mm
    },
    {
        phase: 'Maturazione',
        durationRef: [40, 50],  
        tempMeanRef: [20, 30],
        humidityMeanRef: [20, 50],
        precipitationMeanRef: [0.025, 0.125] // 10mm -- 60mm
    }
    ],

    nutrientsTotalRef: {
        nitrogenTheoretical: [2.0, 3.0],
        phosphorusTheoretical: [1.0, 1.5],
        potassiumTheoretical: [1.5, 2.0],
    }

};

module.exports = SIMULATION_REF_DATA;