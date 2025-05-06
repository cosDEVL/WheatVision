const mongoose = require("mongoose");

const SimulatedDataSchema = new mongoose.Schema(
    {
        simulazioneId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "FormInput",  // Collegamento alla collezione delle simulazioni

        },
        nomeSimulazione: {type: String, required: true, ref: "FormInput"},
        yieldSimulatedPerHectares: {type: Number, required: true, min: 0},
        yieldSimulatedTotal: {type: Number, required: true, min: 0},
        tilleringIndex: {type: Number, required: true, min: 0},
        spikeletsIndex: {type: Number, required: true, min: 0},
        seedsIndex: {type: Number, required: true, min: 0},
        simulatedNitrogen: {type: Number, required: true, min: 0},
        simulatedPhosphorus: {type: Number, required: true, min: 0},
        simulatedPotassium: {type: Number, required: true, min: 0},
        simulatedPrecipitations: {type: Number, required: true, min: 0},
        hectolitreWeight: {type: Number, required: true, min: 0},
        simulation: []
    },
    {timestamps: true}
)


module.exports = mongoose.model('SimulatedData', SimulatedDataSchema );