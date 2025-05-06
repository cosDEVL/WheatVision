const mongoose = require("mongoose");

const FinanceDataSchema = new mongoose.Schema(
    {
        simulazioneId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "FormInput",  // Collegamento alla collezione delle simulazioni

        },
        nomeSimulazione: {type: String, required: true, ref: "FormInput"},
        wheatSeedPricePerHectares: {type: Number, required: true, min: 0}, // €/ton => prezzo delle sementi per tonnellate
        wheatSeedPriceTotal: {type: Number, required: true, min: 0},
        wheatType: {type: String, required: true},
        durumWheatPricePerTons: {type: Number, required: true, min: 0},
        durumWheatPriceTotal: {type: Number, required: true, min: 0}
    },
    {timestamps: true}
)


module.exports = mongoose.model('FinanceData', FinanceDataSchema );