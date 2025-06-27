const Form = require("../models/formInput");
const SimulationData = require("../models/simulationData");


const findSimulation = async (nomeSimulazione) => {
    const simulation = await Form.findOne({ nomeSimulazione });
    if (!simulation) throw new Error("Simulation not found");
    return simulation;
}


/**
 * @desc Get simulation data 
 * @route Get /api/simulation/simulation/:nomeSimulazione
 */

const simulationReportID = async (req, res) => {

    try {
        
        const nomeSimulazione = req.params.nomeSimulazione;

        // Check if simulation exists
        const formData = await findSimulation(nomeSimulazione);

        // Get data from the relative collections
        const formInfo = await Form.findOne({ nomeSimulazione });
        const simulationData = await SimulationData.findOne({ SimulationName: nomeSimulazione });

        res.status(200).json({ 
            formInfo,
            simulationData           
        });

    } catch (error) {
        res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
    }
    
}

const simulationFormReport = async (req, res) => {
    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
       
        const formData= await Form.find({ nomeSimulazione: {$in : simulationNames} });

        // Map every data with the corresponding simulation name
        const formInfoData = simulations.map(simulation => {
            return formData.find(i => i.nomeSimulazione === simulation.nomeSimulazione) || null;

        });

        res.status(201).json(formInfoData);

    } catch (error) {
        res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
    }
}



const fullReport = async (req, res) => {

    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
        
        const simulationData = await SimulationData.find({ SimulationName : {$in: simulationNames} });


        // Map every data with the corresponding simulation name
        const fullReportData = simulations.map(simulation => {
            return {
                simulationForm: simulation,
                simulationData: simulationData.find(i => i.SimulationName === simulation.nomeSimulazione) || null
            };
        });

        res.status(201).json(fullReportData);

    } catch (error) {
        res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
    }

}

    /**
     * @desc Delete a simulation data
     * @route Delete /api/simulation/deleteReport/:nomeSimulazione
     */

    const deleteReport = async (req, res) => {
        try {

            const nomeSimulazione = req.params.nomeSimulazione;

            // Check if simulation exists
            await findSimulation(nomeSimulazione);

            // Find and delete the collections with the corresponding simulation name
            await Promise.all([
                Form.findOneAndDelete({ nomeSimulazione }),
                SimulationData.findOneAndDelete({ SimulationName: nomeSimulazione })
                
            ]);        

            res.status(204).json({ 
                message: "Simulation deleted successfully!",
                
            })
            
        } catch (error) {
            res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
        }
    }


    /**
     * @desc Delete all simulation data
     * @route Delete /api/simulation/deleteAllReport
     */

    const deleteAllReports = async (req, res) => {
        try {
            await Promise.all([
                Form.deleteMany({}),
                SimulationData.deleteMany({})
                
            ])

            res.status(204).json({ message: "All simulations deleted successfully!" });

        } catch (error) {
            res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
        }
    }

module.exports = { simulationReportID, simulationFormReport, fullReport, deleteReport, deleteAllReports };