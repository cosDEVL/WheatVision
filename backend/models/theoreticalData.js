const mongoose = require("mongoose");

const TheoreticalDataSchema = new mongoose.Schema(
    {
        simulazioneId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "FormInput",  // Collegamento alla collezione delle simulazioni

        },
        nomeSimulazione: {type: String, required: true, ref: "FormInput"},
        yieldCalculatedPerHectares: {type: Number, required: true, min: 0},
        tilleringIndex: {type: Number, required: true, min: 0},
        spikeletsIndex: {type: Number, required: true, min: 0},
        seedsIndex: {type: Number, required: true, min: 0},
        theoreticalNitrogen: {type: Number, required: true, min: 0},
        theoreticalPhosphorus: {type: Number, required: true, min: 0},
        theoreticalPotassium: {type: Number, required: true, min: 0},
        theoreticalPrecipitations: {type: Number, required: true, min: 0}
    },
    {timestamps: true}
)


module.exports = mongoose.model('TheoreticalData', TheoreticalDataSchema );