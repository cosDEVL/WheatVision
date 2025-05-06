const mongoose = require("mongoose");

const GeneralDataSchema = new mongoose.Schema(
    {
        simulazioneId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "FormInput",  // Collegamento alla collezione delle simulazioni

        },
        nomeSimulazione: {type: String, required: true, ref: "FormInput"},
        density: {type: Number, required: true, min: 250, max: 500},
        tkw: {type: Number, required: true, min: 0},
        germinability: {type: Number, required: true, min: 0, max: 100},
        sowingRate: {type: Number, required: true, min: 0}

    },
    {timestamps: true}
)


module.exports = mongoose.model('GeneralData', GeneralDataSchema );