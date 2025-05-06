const templateTeoreticPerPhase = [
    {
        phase: 'germination',
        durationRef: [10, 20], // durata minima e massima. questo serve per stabilire quanti giorni dura la fase. questo in parte dipende dalla densità. più alta la densità, più giorni dura e viceversa. 
        tempMeanRef: [0, 15], // range di temperatura accettabile in questa fase
        humidityMeanRef: [50, 80], // range di umidità accettabile in questa fase
        precipitationMeanRef: [0.2, 0.23]
    },
    {
        phase: 'tillering',
        durationRef: [40, 60], 
        tempMeanRef: [0, 15],
        humidityMeanRef: [45, 75],
        precipitationMeanRef: [0.25, 0.27]
    },
    {
        phase: 'raised',
        durationRef: [30, 40], 
        tempMeanRef: [10, 25],
        humidityMeanRef: [40, 70],
        precipitationMeanRef: [0.23, 0.25]
    },
    {
        phase: 'earing and flowering',
        durationRef: [30, 40], 
        tempMeanRef: [15, 25],
        humidityMeanRef: [30, 60],
        precipitationMeanRef: [0.15, 0.17]
    },
    {
        phase: 'maturation',
        durationRef: [40, 50],  
        tempMeanRef: [20, 30],
        humidityMeanRef: [20, 50],
        precipitationMeanRef: [0.08, 0.1]
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