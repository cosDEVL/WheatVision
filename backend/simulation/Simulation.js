const { getTemplateData } = require('./weatherGeneration/fetchOpenMeteo');
const SIMULATION_REF_DATA = require('./data/simulationRefData');
const { generateWeather } = require('./weatherGeneration/generateWeather');

class Simulation {
    
    constructor(formData) {
        this.formData = formData;
        this.refData = SIMULATION_REF_DATA;


        this.weatherData = null;
        this.initialResult = {};
        this.phaseResult = [];
        this.finalResult = {};
    }


    async run() {

        const sowingDate = new Date(this.formData.periodoSemina);
        const weatherTemplate = await getTemplateData(sowingDate.getFullYear());
        this.weatherData = await generateWeather(weatherTemplate);


        this._calculateTheoreticalData();

        this._processPhase();

        this._calculateFinalYield();
        

        return {
            generalData: this.initialResult.generalData,
            theoreticalData: this.initialResult.theoreticalData,
            simulatedData: this.finalResult.simulatedData,
            financeData: this.finalResult.financeData,
            yieldPhaseSimulation: this.phaseResult,
            weatherGenerated: this.weatherData
        }


    }

    _calculateTheoreticalData() {

        try {
            const { densita, pesoDiMille, germinabilita } = this.formData;
        
            const nutrientsRef = this.refData.nutrientsTotalRef;
            const { nitrogenTheoretical, phosphorusTheoretical, potassiumTheoretical } = nutrientsRef;

            const yieldRefData = {
                TilleringIndex: 2,
                SpikeletsIndex: 17,
                SeedsIndex: 1.4
            };

            const precipRelativeToDensity = {
                "250": 400,
                "300": 450,
                "350": 450,
                "400": 500,
                "450": 550,
                "500": 600,
                "550": 600,
            }

            let totalSeedsMQ = densita * yieldRefData.TilleringIndex * yieldRefData.SpikeletsIndex * yieldRefData.SeedsIndex;
            let totalSeedsMQweight = totalSeedsMQ * (pesoDiMille / 1000);

            let theoreticalYield = totalSeedsMQweight / 100;


            this.initialResult = {
                generalData: {
                    Density: densita,
                    TKW: pesoDiMille,
                    Germinability: germinabilita,
                    SowingRate: parseFloat((((densita * pesoDiMille) / (germinabilita) )).toFixed(2))
                },

                theoreticalData: {
                    YieldCalculatedPerHectares: parseFloat(theoreticalYield.toFixed(2)),
                    ...yieldRefData,
                    CalculatedNutrients:{
                        Nitrogen: parseFloat(( densita < 400 ? nitrogenTheoretical[0] * theoreticalYield : nitrogenTheoretical[1] * theoreticalYield).toFixed(2)),
                        Phosphorus: parseFloat(( densita < 400 ? phosphorusTheoretical[0] * theoreticalYield : phosphorusTheoretical[1] * theoreticalYield).toFixed(2)),
                        Potassium: parseFloat(( densita < 400 ? potassiumTheoretical[0] * theoreticalYield : potassiumTheoretical[1] * theoreticalYield).toFixed(2))
                    },
                    CalculatedPrecipitations: precipRelativeToDensity[`${densita}`]
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    _processPhase() {

        try {
                const findPeriodIndex = (date, weatherGenerated) => {
                    return weatherGenerated.findIndex(period => {
                        let startDateTemplate = new Date(period.duration.startDate);
                        let endDateTemplate = new Date(period.duration.endDate);
                        return date >= startDateTemplate && date <= endDateTemplate;
                    })
                }

            const calcMeanValue = (arr) => {
                if (!arr || arr.length === 0) return 0;
                return arr.reduce((sum, value) => sum + value, 0) / arr.length;
            }

            const calcFactor = (mean, optValue, dev) => {
                return 1 - Math.exp( -(Math.pow(Math.abs(mean - optValue), 2) / (2 * Math.pow(dev, 2))) );
            }

            const format = (date) => date.toISOString().split('T')[0];


            const { densita } = this.formData;
            const weatherGenerated = this.weatherData;

            let currentDate = new Date(this.formData.periodoSemina);

            this.refData.phenologicalPhases.forEach(phaseRef => {

                let startDate = new Date(currentDate);
                let endDate = new Date(currentDate);
                let phaseDays = phaseRef.durationRef[0];
                let idxTemplateStart = findPeriodIndex(startDate, weatherGenerated);
                
                const startPeriod = weatherGenerated[idxTemplateStart];
                let endPeriod = null;

                const { tempMeanRef, humidityMeanRef, precipitationMeanRef } = phaseRef;
                const precipRef = precipitationMeanRef.map(value => value * this.initialResult.theoreticalData.CalculatedPrecipitations);

                const optTempMean = calcMeanValue(tempMeanRef);
                const optHumidityMean = calcMeanValue(humidityMeanRef);
                const optPrecipMean = calcMeanValue(precipRef);

                const tempDev = tempMeanRef[1] - optTempMean;
                const humidityDev = humidityMeanRef[1] - optHumidityMean;
                const precipDev = precipRef[1] - optPrecipMean;

                const startDayIdx = startDate.getDate() - 1;


                if (densita > 350) {
                    if (densita <= 450) phaseDays = Math.round(phaseDays + phaseDays * 0.15);
                    else if (densita <= 550) phaseDays = Math.round(phaseDays + phaseDays * 0.20);
                }

                let tempSimulated = startPeriod.tempSimulated.slice(startDayIdx);
                let humiditySimulated = startPeriod.humiditySimulated.slice(startDayIdx);
                let precipSimulated = startPeriod.precipSimulated.slice(startDayIdx);

                endPeriod = weatherGenerated[idxTemplateStart];

                if (phaseDays >= tempSimulated.length){

                    idxTemplateStart +=1;
                    endPeriod = weatherGenerated[idxTemplateStart];
                    
                    tempSimulated = tempSimulated.concat(endPeriod.tempSimulated);
                    humiditySimulated = humiditySimulated.concat(endPeriod.humiditySimulated);
                    precipSimulated = precipSimulated.concat(endPeriod.precipSimulated);
                            
                }

                let tempMean = calcMeanValue(tempSimulated);
                let humidityMean = calcMeanValue(humiditySimulated);
                let precipMean = calcMeanValue(precipSimulated);

                let tempFactor = calcFactor(tempMean, optTempMean, tempDev);
                let humidityFactor = calcFactor(humidityMean, optHumidityMean, humidityDev);
                let precipFactor = calcFactor(precipMean, optPrecipMean, precipDev);

                let climaticFactor = 1 - parseFloat(Math.pow((tempFactor * humidityFactor * precipFactor), 1 / 3).toFixed(2));

                const finalDays =  Math.round(phaseDays + (phaseDays * (climaticFactor)));


                endDate.setDate(endDate.getDate() + finalDays - 1);
                
                startDate = format(startDate);
                endDate = format(endDate);

                
                // Questo IF viene avviato in caso le giornate calcolate finali dovessero essere maggiori dei valori di tempSimulated ecc concatenati
                // In questo modo vengono registrati i dati di tutti i giorni, evitando di avere nei grafici giorni con dati mancanti
                if (tempSimulated.length < finalDays) {
                    idxTemplateStart += 1;
                    endPeriod = weatherGenerated[idxTemplateStart];
                    tempSimulated = tempSimulated.concat(endPeriod.tempSimulated);
                    humiditySimulated = humiditySimulated.concat(endPeriod.humiditySimulated);
                    precipSimulated = precipSimulated.concat(endPeriod.precipSimulated);
                }

                const phaseResult = {
                    phase: phaseRef.phase,
                    duration: { days: finalDays, startDate: startDate, endDate: endDate },
                    tempSimulated: tempSimulated.slice(0, finalDays),
                    tempMean: parseFloat(calcMeanValue(tempSimulated).toFixed(2)),
                    humiditySimulated: humiditySimulated.slice(0, finalDays), 
                    humidityMean: parseFloat(calcMeanValue(humiditySimulated).toFixed(2)),
                    precipSimulated: precipSimulated.slice(0, finalDays),
                    precipSum: parseFloat((precipSimulated.reduce((acc, value) => acc + value, 0)).toFixed(2))
                }

                this.phaseResult.push(phaseResult);
                currentDate = new Date(endDate);
            })
        } catch (error) {
            console.log(error)
        }
    }

    _calculateFinalYield() {

        try {
            const calcMeanValue = (arr) => {
                if (!arr || arr.length === 0) return 0;
                return arr.reduce((sum, value) => sum + value, 0) / arr.length;
            }

            const calcClimaticValueFactor = (mean, optValue, dev) => {
                let result = parseFloat((Math.exp( -(Math.pow(Math.abs(mean - optValue), 2) / (2 * Math.pow(dev, 2))) )).toFixed(2))
                return result <= 0.1 ? 0.1 : result;
            }

            const calcNutrientsValueFactor = (mean, optValue, dev = (0.5 * optValue)) => {
                let result = Math.exp( -(Math.pow( ((mean - optValue) / dev), 2 )) )
                return result <= 0.1 ? 0.1 : result;
            }

            const { azoto: inputNitrogen, fosforo: inputPhosphorus, potassio: inputPotassium } = this.formData;
            const { Nitrogen: calculatedNitrogen, Phosphorus: calculatedPhosphorus, Potassium: calculatedPotassium } = this.initialResult.theoreticalData.CalculatedNutrients;

            let nitrogenFactor = calcNutrientsValueFactor(inputNitrogen, calculatedNitrogen);
            let phosphorusFactor = calcNutrientsValueFactor(inputPhosphorus, calculatedPhosphorus);
            let potassiumFactor = calcNutrientsValueFactor(inputPotassium, calculatedPotassium);
            let nutrientFactor = parseFloat(Math.pow((nitrogenFactor * phosphorusFactor * potassiumFactor), 1 / 3).toFixed(2));


            const { TilleringIndex, SpikeletsIndex, SeedsIndex } = this.initialResult.theoreticalData;
            const { Density, TKW } = this.initialResult.generalData;

            let simulatedTilleringIndex = TilleringIndex;
            let simulatedSpikeletsIndex = SpikeletsIndex;
            let simulatedSeedsIndex = SeedsIndex;

            this.phaseResult.forEach((phase, index) => {

                const { tempMean, humidityMean, precipSum } = phase;
                const { tempMeanRef, humidityMeanRef, precipitationMeanRef } = this.refData.phenologicalPhases[index];

                const precipRef = precipitationMeanRef.map(value => value * this.initialResult.theoreticalData.CalculatedPrecipitations);

                const optTempMean = calcMeanValue(tempMeanRef);
                const optHumidityMean = calcMeanValue(humidityMeanRef);
                const optPrecipMean = calcMeanValue(precipRef);

                const tempDev = tempMeanRef[1] - optTempMean;
                const humidityDev = humidityMeanRef[1] - optHumidityMean;
                const precipDev = precipRef[1] - optPrecipMean;

                const tempFactor = calcClimaticValueFactor(tempMean, optTempMean, tempDev);
                const humidityFactor = calcClimaticValueFactor(humidityMean, optHumidityMean, humidityDev);
                const precipFactor = calcClimaticValueFactor(precipSum, optPrecipMean, precipDev);

                const phaseClimaticFactor = 1 - parseFloat(Math.pow((tempFactor * humidityFactor * precipFactor), 1 / 3).toFixed(2));

                const combinedFactor = ( phaseClimaticFactor + nutrientFactor ) / 2;

                switch (phase.phase) {
                    case 'Accestimento':
                        simulatedTilleringIndex *= combinedFactor;
                        break;
                    case 'Spigatura e Fioritura':
                        simulatedSpikeletsIndex *= combinedFactor;
                        break;
                    case 'Maturazione': 
                        simulatedSeedsIndex *= combinedFactor;
                        break;
                    default: 
                        break;
                }

            });

            // Calcolo resa finale
            let totalSeedsMQ_SIMULATED = Density * simulatedTilleringIndex * simulatedSpikeletsIndex * simulatedSeedsIndex;
            let totalSeedsMQweight_SIMULATED = totalSeedsMQ_SIMULATED * (TKW / 1000);
            let finalYieldHectares = totalSeedsMQweight_SIMULATED / 100;
            let finalYieldTotal = finalYieldHectares * this.formData.ettariColtivazione;


            // Definizione qualita' e valore del raccolto
            const overallFactor = parseFloat(Math.pow( (simulatedTilleringIndex/TilleringIndex) * (simulatedSpikeletsIndex/SpikeletsIndex) * (simulatedSeedsIndex/SeedsIndex), 1/3).toFixed(2));
            const hectolitreRange = [76, 82];
            let hectolitreWeight = hectolitreRange[0] + ( hectolitreRange[1] - hectolitreRange[0] ) * overallFactor;

            let wheatType = "";
            let wheatPricePerTons = [];

            if (hectolitreWeight >= 79.5) {
                wheatType = "Frumento Duro Fino";
                wheatPricePerTons = [305, 310];
            } else if (hectolitreWeight >= 78.0) {
                wheatType = "Frumento Duro Buon Mercantile";
                wheatPricePerTons = [300, 305];
            } else if (hectolitreWeight >= 76.0) {
                wheatType = "Frumento Duro Mercantile";
                wheatPricePerTons = [295, 300];
            } else {
                wheatType = "Non classificabile";
                wheatPricePerTons = [250, 260];
            }

            let wheatPriceTotal = [];
            wheatPricePerTons.forEach((price) => wheatPriceTotal.push( parseFloat( (price * finalYieldTotal).toFixed(2) )) );


            let precipitationTotSimulated = this.phaseResult.reduce((sum, phase) => sum + phase.precipSum, 0);

            this.finalResult = {

                simulatedData: {
                    YieldSimulated: {
                        PerHectares: parseFloat(finalYieldHectares.toFixed(2)),
                        Total: parseFloat(finalYieldTotal.toFixed(2))
                    },
                    HectolitreWeight: parseFloat(hectolitreWeight.toFixed(2)),
                    TilleringIndex: parseFloat(simulatedTilleringIndex.toFixed(2)),
                    SpikeletsIndex: parseFloat(simulatedSpikeletsIndex.toFixed(2)),
                    SeedsIndex: parseFloat(simulatedSeedsIndex.toFixed(2)),
                    SimulatedNutrients: {
                        Nitrogen: parseFloat(inputNitrogen.toFixed(2)),
                        Phosphorus: parseFloat(inputPhosphorus.toFixed(2)),
                        Potassium: parseFloat(inputPotassium.toFixed(2))
                    },
                    SimulatedPrecipitations: parseFloat(precipitationTotSimulated.toFixed(2))
                    },

                    financeData: {
                        WheatType: wheatType,
                        WheatPrice:{
                            PerTons: wheatPricePerTons,
                            Total: wheatPriceTotal
                        }
                    }

            }

        } catch (error) {
            console.log(error)
        }

    }

}

module.exports = Simulation;