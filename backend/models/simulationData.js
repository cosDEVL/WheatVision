const mongoose = require("mongoose");

const SimulationDataSchema = new mongoose.Schema(
    {
        SimulationId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Form",  // Collegamento alla collezione delle simulazioni
            
        },
        SimulationName: {type: String, required: true, ref: "Form"},
        GeneralData: {
            Density: {type: Number, required: true, min: 250, max: 500},
            TKW: {type: Number, required: true, min: 0},
            Germinability: {type: Number, required: true, min: 0, max: 100},
            SowingRate: {type: Number, required: true, min: 0}
        },
        CalculatedData: {
            YieldCalculatedPerHectares: {type: Number, required: true, min: 0},
            TilleringIndex: {type: Number, required: true, min: 0},
            SpikeletsIndex: {type: Number, required: true, min: 0},
            SeedsIndex: {type: Number, required: true, min: 0},
            CalculatedNutrients:{
                Nitrogen: {type: Number, required: true, min: 0},
                Phosphorus: {type: Number, required: true, min: 0},
                Potassium: {type: Number, required: true, min: 0}
            },
            CalculatedPrecipitations: {type: Number, required: true, min: 0}
        },
        SimulatedData: {
            YieldSimulated: {
                PerHectares: {type: Number, required: true, min: 0},
                Total: {type: Number, required: true, min: 0}
            },
            HectolitreWeight: {type: Number, required: true, min: 0},
            TilleringIndex: {type: Number, required: true, min: 0},
            SpikeletsIndex: {type: Number, required: true, min: 0},
            SeedsIndex: {type: Number, required: true, min: 0},
            SimulatedNutrients: {
                Nitrogen: {type: Number, required: true, min: 0},
                Phosphorus: {type: Number, required: true, min: 0},
                Potassium: {type: Number, required: true, min: 0}
            },
            SimulatedPrecipitations: {type: Number, required: true, min: 0},
            PhaseInfo: [],
            MeteoGenerated: []
        },
        FinancialData: {
            WheatType: {type: String, required: true},
            WheatSeedPrice: {
                PerHectares: {type: Number, required: true, min: 0},
                Total: {type: Number, required: true, min: 0}
            },
            DurumWheatPrice:{
                PerTons: {type: Number, required: true, min: 0},
                Total: {type: Number, required: true, min: 0}
            }
        }
    }, 
    {timestamps: true}
)


module.exports = mongoose.model('SimulationData', SimulationDataSchema);