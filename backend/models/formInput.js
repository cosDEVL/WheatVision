const mongoose = require("mongoose");

const FormInputSchema = new mongoose.Schema(
    {
        nomeSimulazione: {type: String, required: true, unique: true},
        periodoSemina: {type: String, required: true},
        ettariColtivazione: {type: Number, min: 0, required: true},
        densita: {type: Number, required: true, min: 250, max: 500},
        pesoDiMille: {type: Number, required: true, min: 0},
        germinabilita: {type: Number, required: true, min: 80, max: 100, default: 90},
        azoto: {type: Number, min: 0, required: true},
        fosforo: {type: Number, min: 0, required: true},
        potassio: {type: Number, min: 0, required: true},

    },
    {timestamps: true}
)

module.exports = mongoose.model("Form", FormInputSchema);