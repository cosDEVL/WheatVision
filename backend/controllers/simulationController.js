const express = require("express");

const Form = require("../models/formInput");
const SimulationData = require('../models/simulationData');


const { startSimulation } = require('./simulations/simulationFiles/simulatedYield'); 

const validateValue = (value, min, fieldName, res) => {
    if (value === undefined || value === null) {
        res.status(400).json({ message: `Please, enter the ${fieldName} value` });
        return false;
    }

    if (value < min) {
        res.status(400).json({ message: `The ${fieldName} value must be above 0` });
        return false;
    }
    return true;
}

const validateRange = (value, min, max, fieldName, res) => {
    if (value === undefined || value === null) {
        res.status(400).json({ message: `Please, enter the ${fieldName} value` });
        return false;
    }

    if (value < min || value > max) {
        res.status(400).json({ message: `The ${fieldName} value must be between ${min} and ${max}` });
        return false;
    }
    return true;
}


/**
 * @desc Post form input data into DataBase 
 * @route Post /api/simulation/form
 */

const formInput = async (req, res) => {

    try {
        
        const { nomeSimulazione, periodoSemina, ettariColtivazione, densita, pesoDiMille, germinabilita, azoto, fosforo, potassio } = req.body;

        // Check if the simulation name is unique
        const simulationNameExists = await Form.findOne({ nomeSimulazione });
        if (simulationNameExists) {
            return res.status(400).json({ message: "There is already a simulation with this name!" })
        }

        // Da sistemare questa parte
        if (!periodoSemina) {
            return res.status(400).json({ message: "Please, insert the sowing date." })
        }

        // Check if cultivationHectares is above 0
        if (!validateValue(ettariColtivazione, 0, "Cultivation Hectares", res)) return; 

        // Check if density value is between 250 and 500
        if (!validateRange(densita, 250, 500, "Seed Density", res)) return;

        // Check if TKW value is between 30 and 60
        if (!validateValue(pesoDiMille, 0, "TKW", res)) return;

        // Check if germinability % value is between 80 and 100
        if (!validateRange(germinabilita, 0, 100, "Germinability %", res)) return;

        // Check if nitrogen value is above 0
        if (!validateValue(azoto, 0, "Nitrogen", res)) return;

        // Check if phosphorus value is above 0
        if (!validateValue(fosforo, 0, "Phosphorus", res)) return;

        // Check if potassium value is above 0
        if (!validateValue(fosforo, 0, "Potassium", res)) return;

        const form = await Form.create({
            nomeSimulazione, 
            periodoSemina,
            ettariColtivazione,
            densita,
            pesoDiMille,
            germinabilita,
            azoto, 
            fosforo, 
            potassio
        });

        const simulationResponse = await startSimulation(form.ettariColtivazione, form.densita, form.pesoDiMille, form.germinabilita / 100, form.azoto, form.fosforo, form.potassio, form.periodoSemina);
        const generalData = simulationResponse.templateYieldData.generalData;
        const calculatedData = simulationResponse.templateYieldData.theoreticalData;
        const simulatedData = simulationResponse.templateYieldData.simulatedData;
        const financeData = simulationResponse.templateYieldData.financeData;


        await fetch('http://localhost:8000/api/simulation/simulationData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                SimulationId: form._id,
                SimulationName: form.nomeSimulazione,
                GeneralData: {
                    Density: generalData.density,
                    TKW: generalData.TKW,
                    Germinability: generalData.germinability,
                    SowingRate: generalData.sowingRate
                },
                CalculatedData: {
                    YieldCalculatedPerHectares: calculatedData.yieldCalculatedPerHectares,
                    TilleringIndex: calculatedData.tilleringIndex,
                    SpikeletsIndex: calculatedData.spikeletsIndex,
                    SeedsIndex: calculatedData.seedsIndex,
                    CalculatedNutrients:{
                        Nitrogen: calculatedData.theoreticalNitrogen,
                        Phosphorus: calculatedData.theoreticalPhosphorus,
                        Potassium: calculatedData.theoreticalPotassium
                    },
                    CalculatedPrecipitations: calculatedData.theoreticalPrecipitations
                },
                SimulatedData: {
                    YieldSimulated: {
                        PerHectares: simulatedData.yieldSimulatedPerHectares,
                        Total: simulatedData.yieldSimulatedTotal
                    },
                    TilleringIndex: simulatedData.tilleringIndex,
                    SpikeletsIndex: simulatedData.spikeletsIndex,
                    SeedsIndex: simulatedData.seedsIndex,
                    SimulatedNutrients: {
                        Nitrogen: simulatedData.simulatedNitrogen,
                        Phosphorus: simulatedData.simulatedPhosphorus,
                        Potassium: simulatedData.simulatedPotassium
                    },
                    SimulatedPrecipitations: simulatedData.simulatedPrecipitations,
                    HectolitreWeight: simulatedData.hectolitreWeight,
                    PhaseInfo: simulationResponse.yieldTemplateSimulationPerPhase,
                    MeteoGenerated: simulationResponse.weatherGenerated
                },
                FinancialData: {
                    WheatType: financeData.wheatType,
                    WheatSeedPrice: {
                        PerHectares: financeData.wheatSeedPricePerHectares,
                        Total: financeData.wheatSeedPriceTotal
                    },
                    DurumWheatPrice:{
                        PerTons: financeData.durumWheatPricePerTons,
                        Total: financeData.durumWheatPriceTotal
                    }
                }
            })
        }) 

        
        res.status(201).json({
            _id: form._id,
            nomeSimulazione: form.nomeSimulazione,
            periodoSemina: form.periodoSemina,
            ettariColtivazione: form.ettariColtivazione,
            densita: form.densita,
            pesoDiMille: form.pesoDiMille,
            germinabilita: form.germinabilita,
            azoto: form.azoto,
            fosforo: form.fosforo,
            potassio: form.potassio
        });

    } catch (error) {
        
        res.status(500).json({ message: "Server error!", error: error.message })

    }

}   

const simulationData = async (req, res) => {

    const { SimulationId, SimulationName, GeneralData, CalculatedData, SimulatedData, FinancialData } = req.body;

    const simulationData = await SimulationData.create({
        SimulationId, 
        SimulationName,
        GeneralData,
        CalculatedData, 
        SimulatedData,
        FinancialData
    })

    res.status(201).json({
        _id: simulationData.SimulationId,
        SimulationName: simulationData.SimulationName,
        GeneralData: simulationData.GeneralData,
        CalculatedData: simulationData.CalculatedData,
        SimulatedData: simulationData.SimulatedData,
        FinancialData: simulationData.FinancialData
    })

} 




module.exports = { formInput, simulationData };