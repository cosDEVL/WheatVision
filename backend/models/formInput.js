const mongoose = require("mongoose");

const FormInputSchema = new mongoose.Schema(
    {
        nomeSimulazione: {type: String, required: true, unique: true},
        periodoSemina: {type: String, required: true},
        ettariColtivazione: {
            type: Number, 
            min: [0, 'Il valore di `Ettari di coltivazione` deve essere MAGGIORE di 0. Valore digitato: {VALUE}'], 
            required: true
        },
        densita: {
            type: Number, required: true, enum: {
                values:[300, 350, 400, 450, 500],
                message: 'Valore della densita` selezionato non valido. Selezionare un valore tra 300, 350, 400, 450, 500.'
        }},
        pesoDiMille: {
            type: Number, 
            required: true, 
            min: [30, 'Il valore di `Peso di mille semi` deve essere compreso tra 30 e 60. Valore digitato: {VALUE}'], 
            max: [60, 'Il valore di `Peso di mille semi` deve essere compreso tra 30 e 60. Valore digitato: {VALUE}']
        },
        germinabilita: {
            type: Number, 
            required: true, 
            min: [80, 'Il valore di `Germinabilita` deve essere compreso tra 80 e 100. Valore digitato: {VALUE}'], 
            max: [100, 'Il valore di `Germinabilita` deve essere compreso tra 80 e 100. Valore digitato: {VALUE}']
        },
        azoto: {
            type: Number, 
            min: [0, 'Il valore di `Azoto` deve essere MAGGIORE di 0. Valore digitato: {VALUE}'], 
            required: true
        },
        fosforo: {
            type: Number, 
            min: [0, 'Il valore di `Fosforo` deve essere MAGGIORE di 0. Valore digitato: {VALUE}'], 
            required: true
        },
        potassio: {
            type: Number, 
            min: [0, 'Il valore di `Potassio` deve essere MAGGIORE di 0. Valore digitato: {VALUE}'], 
            required: true
        },

    },
    {timestamps: true}
)

module.exports = mongoose.model("Form", FormInputSchema);