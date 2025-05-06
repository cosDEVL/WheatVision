const express = require("express");

const Form = require("../models/formInput");
const GeneralData = require("../models/generalData");
const TheoreticalData = require("../models/theoreticalData");
const SimulatedData = require("../models/simulatedData");
const FinanceData = require("../models/financeData");

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
        console.log(nomeSimulazione);
        const simulationNameExists = await Form.findOne({ nomeSimulazione });
        console.log(simulationNameExists);
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
        

        await fetch('http://localhost:8000/api/simulation/sowingInfo', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                simulazioneId: form._id,
                nomeSimulazione: form.nomeSimulazione,
                density: generalData.density,
                tkw: generalData.TKW,
                germinability: generalData.germinability * 100,
                sowingRate: generalData.sowingRate
            })
        })

        
        const theoreticalData = simulationResponse.templateYieldData.theoreticalData;
        

        await fetch('http://localhost:8000/api/simulation/theoreticalData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                simulazioneId: form._id,
                nomeSimulazione: form.nomeSimulazione,
                yieldCalculatedPerHectares: theoreticalData.yieldCalculatedPerHectares,
                tilleringIndex: theoreticalData.tilleringIndex,
                spikeletsIndex: theoreticalData.spikeletsIndex,
                seedsIndex: theoreticalData.seedsIndex,
                theoreticalNitrogen: theoreticalData.theoreticalNitrogen,
                theoreticalPhosphorus: theoreticalData.theoreticalPhosphorus,
                theoreticalPotassium: theoreticalData.theoreticalPotassium,
                theoreticalPrecipitations: theoreticalData.theoreticalPrecipitations
            })
        })

        const simulatedData = simulationResponse.templateYieldData.simulatedData;
        

        await fetch('http://localhost:8000/api/simulation/simulatedData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                simulazioneId: form._id,
                nomeSimulazione: form.nomeSimulazione,
                yieldSimulatedPerHectares: simulatedData.yieldSimulatedPerHectares,
                yieldSimulatedTotal: simulatedData.yieldSimulatedTotal,
                tilleringIndex: simulatedData.tilleringIndex,
                spikeletsIndex: simulatedData.spikeletsIndex,
                seedsIndex: simulatedData.seedsIndex,
                simulatedNitrogen: simulatedData.simulatedNitrogen,
                simulatedPhosphorus: simulatedData.simulatedPhosphorus,
                simulatedPotassium: simulatedData.simulatedPotassium,
                simulatedPrecipitations: simulatedData.simulatedPrecipitations,
                hectolitreWeight: simulatedData.hectolitreWeight,
                simulation: simulationResponse.yieldTemplateSimulationPerPhase
            })
        })

        const financeData = simulationResponse.templateYieldData.financeData;
        

        await fetch('http://localhost:8000/api/simulation/financeData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                simulazioneId: form._id,
                nomeSimulazione: form.nomeSimulazione,
                wheatSeedPricePerHectares: financeData.wheatSeedPricePerHectares, // €/ton => prezzo delle sementi per tonnellate
                wheatSeedPriceTotal: financeData.wheatSeedPriceTotal,
                wheatType: financeData.wheatType,
                durumWheatPricePerTons: financeData.durumWheatPricePerTons,
                durumWheatPriceTotal: financeData.durumWheatPriceTotal
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


/**
 * @desc Post yield data into DataBase 
 * @route Post /api/simulation/yield
 */

const sowingInfo = async (req, res) => {


    const { simulazioneId, nomeSimulazione, density, tkw, germinability, sowingRate } = req.body;

    const sowingInfo = await GeneralData.create({
        simulazioneId,
        nomeSimulazione,
        density,
        tkw,
        germinability,
        sowingRate
    });

    res.status(201).json({
        nomeSimulazione: sowingInfo.nomeSimulazione,
        density: sowingInfo.density,
        tkw: sowingInfo.tkw,
        germinability: sowingInfo.germinability,
        sowingRate: sowingInfo.sowingRate
    });

}


/**
 * @desc Post Environment data into DataBase 
 * @route Post /api/simulation/environment
 */

const theoreticalData = async (req, res) => {

    const { simulazioneId, nomeSimulazione, yieldCalculatedPerHectares, tilleringIndex, spikeletsIndex, seedsIndex, theoreticalNitrogen, theoreticalPhosphorus, theoreticalPotassium, theoreticalPrecipitations } = req.body;

    const theoreticalSowingData = await TheoreticalData.create({
        simulazioneId,
        nomeSimulazione,
        yieldCalculatedPerHectares,
        tilleringIndex,
        spikeletsIndex,
        seedsIndex,
        theoreticalNitrogen,
        theoreticalPhosphorus,
        theoreticalPotassium,
        theoreticalPrecipitations
    });

    res.status(201).json({
        nomeSimulazione: theoreticalSowingData.nomeSimulazione,
        yieldCalculatedPerHectares: theoreticalSowingData.yieldCalculatedPerHectares,
        tilleringIndex: theoreticalSowingData.tilleringIndex,
        spikeletsIndex: theoreticalSowingData.spikeletsIndex,
        seedsIndex: theoreticalSowingData.seedsIndex,
        theoreticalNitrogen: theoreticalSowingData.theoreticalNitrogen,
        theoreticalPhosphorus: theoreticalSowingData.theoreticalPhosphorus,
        theoreticalPotassium: theoreticalSowingData.theoreticalPotassium,
        theoreticalPrecipitations: theoreticalSowingData.theoreticalPrecipitations
    });

}

const simulatedData = async (req, res) => {

    const { simulazioneId, nomeSimulazione, yieldSimulatedPerHectares, yieldSimulatedTotal, tilleringIndex, spikeletsIndex, seedsIndex, simulatedNitrogen, simulatedPhosphorus, simulatedPotassium, simulatedPrecipitations, hectolitreWeight, simulation } = req.body;

    const simulatedSowingData = await SimulatedData.create({
        simulazioneId,
        nomeSimulazione,
        yieldSimulatedPerHectares,
        yieldSimulatedTotal,
        tilleringIndex,
        spikeletsIndex,
        seedsIndex,
        simulatedNitrogen,
        simulatedPhosphorus,
        simulatedPotassium,
        simulatedPrecipitations,
        hectolitreWeight,
        simulation
    });

    res.status(201).json({
        nomeSimulazione: simulatedSowingData.nomeSimulazione,
        yieldSimulatedPerHectares: simulatedSowingData.yieldSimulatedPerHectares,
        tilleringIndex: simulatedSowingData.tilleringIndex,
        spikeletsIndex: simulatedSowingData.spikeletsIndex,
        seedsIndex: simulatedSowingData.seedsIndex,
        simulatedNitrogen: simulatedSowingData.simulatedNitrogen,
        simulatedPhosphorus: simulatedSowingData.simulatedPhosphorus,
        simulatedPotassium: simulatedSowingData.simulatedPotassium,
        simulatedPrecipitations: simulatedSowingData.simulatedPrecipitations,
        hectolitreWeight: simulatedSowingData.hectolitreWeight,
        simulation: simulatedSowingData.simulation
    });

}


/**
 * @desc Post finance data into DataBase 
 * @route Post /api/simulation/finance
 */

const financeData = async (req, res) => {

    const { simulazioneId, nomeSimulazione, wheatSeedPricePerHectares, wheatSeedPriceTotal, wheatType, durumWheatPricePerTons, durumWheatPriceTotal } = req.body;

    const financeData = await FinanceData.create({
        simulazioneId,
        nomeSimulazione,
        wheatSeedPricePerHectares,
        wheatSeedPriceTotal,
        wheatType,
        durumWheatPricePerTons,
        durumWheatPriceTotal
    });

    res.status(201).json({
        nomeSimulazione: financeData.nomeSimulazione,
        wheatSeedPricePerHectares: financeData.wheatSeedPricePerHectares,
        wheatSeedPriceTotal: financeData.wheatSeedPriceTotal,
        wheatType: financeData.wheatType,
        durumWheatPricePerTons: financeData.durumWheatPricePerTons,
        durumWheatPriceTotal: financeData.durumWheatPriceTotal
    });

}

module.exports = { formInput, sowingInfo, theoreticalData, simulatedData, financeData };