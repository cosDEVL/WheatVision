const templateTeoreticPerPhase = [
    {
        phase: 'germination',
        durationRef: [7, 20], // durata minima e massima. questo serve per stabilire quanti giorni dura la fase. questo in parte dipende dalla densità. più alta la densità, più giorni dura e viceversa. 
        tempMeanRef: [0, 15], // range di temperatura accettabile in questa fase
        humidityMeanRef: [50, 80], // range di umidità accettabile in questa fase
        precipitationMeanRef: [0.05, 0.1] // 20mm -- 40mm
    },
    {
        phase: 'tillering',
        durationRef: [30, 50], 
        tempMeanRef: [0, 15],
        humidityMeanRef: [45, 75],
        precipitationMeanRef: [0.25, 0.325] // 100mm -- 130mm
    },
    {
        phase: 'stem elongation',
        durationRef: [25, 40], 
        tempMeanRef: [10, 25],
        humidityMeanRef: [40, 70],
        precipitationMeanRef: [0.325, 0.375] // 130mm -- 150mm
    },
    {
        phase: 'earing and flowering',
        durationRef: [15, 30], 
        tempMeanRef: [15, 25],
        humidityMeanRef: [30, 60],
        precipitationMeanRef: [0.35, 0.5] // 140mm -- 200mm
    },
    {
        phase: 'maturation',
        durationRef: [40, 50],  
        tempMeanRef: [20, 30],
        humidityMeanRef: [20, 50],
        precipitationMeanRef: [0.025, 0.125] // 10mm -- 60mm
    },

];

let templateTeoreticTotal = {
        nutrientsTotalRef: {    //range di nutrienti per tonnellate di raccolto. questi dipendono dalla densità: più alta è, più nutrienti servono e viceversa
            nitrogenTeoretical: [2.0, 3.0], 
            phosphorusTeoretical: [1.0, 1.5],
            potassiumTeoretical: [1.5, 2.0],

        },
        precipitationTotalRef: {
            precipitationTheoretical: [350, 650, 125],
        } //range di precipitazioni necessarie per la coltivazione. questa dipende dalla densità: più alta è, più precipitazioni servono e viceversa
    };

module.exports = { templateTeoreticPerPhase, templateTeoreticTotal };