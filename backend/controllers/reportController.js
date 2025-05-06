const Form = require("../models/formInput");
const GeneralData = require("../models/generalData");
const TheoreticalData = require("../models/theoreticalData");
const SimulatedData = require("../models/simulatedData");
const FinanceData = require("../models/financeData");


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
        const formInfo = await Form.findOne({ nomeSimulazione })
        const sowingInfo = await GeneralData.findOne({ nomeSimulazione });
        const theoreticalSowingData = await TheoreticalData.findOne({ nomeSimulazione });
        const simulatedSowingData = await SimulatedData.findOne({ nomeSimulazione });
        const financeData = await FinanceData.findOne({ nomeSimulazione });

        res.status(200).json({ 
            formInfo,
            sowingInfo,
            theoreticalSowingData,
            simulatedSowingData,
            financeData            
        })

    } catch (error) {
        res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
    }
    
}


/**
 * @desc Get form data 
 * @route Get /api/simulation/form/:simulationName
 */

const formReportID = async (req, res) => {
    try {
        
        const nomeSimulazione = req.params.nomeSimulazione;

        // Check if simulation exists
        const formData = await findSimulation(nomeSimulazione);

        res.status(200).json({ 
            message: "Form data retrieved successfully",
            formData 
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



/**
 * @desc Get yield data 
 * @route Get /api/simulation/yield/:simulationName
 */

const sowingReportID = async (req, res) => {

    try {
            
        const nomeSimulazione = req.params.nomeSimulazione;

        // Check if simulation exists
        await findSimulation(nomeSimulazione);

        // Get data from the relative collections
        const sowingInfo = await GeneralData.findOne({ nomeSimulazione });

        res.status(200).json({
            message: "Sowing info retrieved successfully",
            sowingInfo 
            });

    } catch (error) {
        res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
    }

}

const sowingReport = async (req, res) => {

    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
       
        const sowingInfo= await GeneralData.find({ nomeSimulazione: {$in : simulationNames} });

        // Map every data with the corresponding simulation name
        const sowingInfoData = simulations.map(simulation => {
            return sowingInfo.find(i => i.nomeSimulazione === simulation.nomeSimulazione) || null;

        });

        res.status(201).json(sowingInfoData);

    } catch (error) {
        res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
    }

}


/**
 * @desc Get environment data 
 * @route Get /api/simulation/environment/:simulationName
 */

const theoreticalDataReportID = async (req, res) => {

    try {
            
        const nomeSimulazione = req.params.nomeSimulazione;

        // Check if simulation exists
        await findSimulation(nomeSimulazione);

        // Get data from the relative collections
        const theoreticalSowingData = await TheoreticalData.findOne({ nomeSimulazione });

        res.status(200).json({ 
            message: "Theoretical sowing data retrieved successfully",
            theoreticalSowingData 
        });

    } catch (error) {
        res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
    }

}

const theoreticalDataReport = async (req, res) => {

    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
       
        const theoreticalData= await TheoreticalData.find({ nomeSimulazione: {$in : simulationNames} });

        // Map every data with the corresponding simulation name
        const theoreticalDataReport = simulations.map(simulation => {
            return theoreticalData.find(i => i.nomeSimulazione === simulation.nomeSimulazione) || null;

        });

        res.status(201).json(theoreticalDataReport);

    } catch (error) {
        res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
    }

}


/**
 * @desc Get finance data 
 * @route Get /api/simulation/finance/:simulationName
 */

const simulatedDataReportID = async (req, res) => {

    try {
            
        const nomeSimulazione = req.params.nomeSimulazione;

        // Check if simulation exists
        await findSimulation(nomeSimulazione);

        // Get data from the relative collections
        const simulatedSowingData = await SimulatedData.findOne({ nomeSimulazione });

        res.status(200).json({ 
            message: "Simulated sowing data retrieved successfully",
            simulatedSowingData 
        });

    } catch (error) {
        res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
    }

}

const simulatedDataReport = async (req, res) => {

    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
       
        const simulatedData= await SimulatedData.find({ nomeSimulazione: {$in : simulationNames} });

        // Map every data with the corresponding simulation name
        const simulatedDataReport = simulations.map(simulation => {
            return simulatedData.find(i => i.nomeSimulazione === simulation.nomeSimulazione) || null;

        });

        res.status(201).json(simulatedDataReport);

    } catch (error) {
        res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
    }

}


const financeDataReportID = async (req, res) => {

    try {
            
        const nomeSimulazione = req.params.nomeSimulazione;

        // Check if simulation exists
        await findSimulation(nomeSimulazione);

        // Get data from the relative collections
        const financeData = await FinanceData.findOne({ nomeSimulazione });

        res.status(200).json({ 
            message: "Finance data retrieved successfully",
            financeData 
        });

    } catch (error) {
        res.status(error.message === "Simulation not found" ? 404 : 500).json({ message: error.message || "Server error!" });
    }

}

const financeDataReport = async (req, res) => {

    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
       
        const financeData= await FinanceData.find({ nomeSimulazione: {$in : simulationNames} });

        // Map every data with the corresponding simulation name
        const financeDataReport = simulations.map(simulation => {
            return financeData.find(i => i.nomeSimulazione === simulation.nomeSimulazione) || null;

        });

        res.status(201).json(financeDataReport);

    } catch (error) {
        res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
    }

}


/**
 * @desc Get full report data 
 * @route Get /api/simulation/fullReport
 */

const fullReport = async (req, res) => {

    try {

        //Check if there's data in Form DB and get all of it's data
        const simulations = await Form.find({});
        if(simulations.length === 0) return res.status(404).json({ message: "No simulations found!" });

        const simulationNames = simulations.map(sim => sim.nomeSimulazione);
       
        // Get all data in Yield, environment and Finance Collections
        const [sowingInfo, theoreticalSowingData, simulatedSowingData, financeData] = await Promise.all([
            GeneralData.find({ nomeSimulazione: {$in : simulationNames} }),
            TheoreticalData.find({ nomeSimulazione: {$in : simulationNames} }),
            SimulatedData.find({ nomeSimulazione: {$in : simulationNames} }),
            FinanceData.find({ nomeSimulazione: {$in : simulationNames} })
        ]);

        // Map every data with the corresponding simulation name
        const fullReportData = simulations.map(simulation => {
            return {
                simulationForm: simulation,
                sowingInfo: sowingInfo.find(i => i.nomeSimulazione === simulation.nomeSimulazione) || null,
                theoreticalSowingData: theoreticalSowingData.find(t => t.nomeSimulazione === simulation.nomeSimulazione)  || null,
                simulatedSowingData: simulatedSowingData.find(s => s.nomeSimulazione === simulation.nomeSimulazione)  || null,
                financeData: financeData.find(f => f.nomeSimulazione === simulation.nomeSimulazione)  || null

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
            const [ deletedForm, deletedSowingInfo, deletedTheoreticalData, deletedSimulatedData, deletedFinance ] = await Promise.all([
                Form.findOneAndDelete({ nomeSimulazione }),
                GeneralData.findOneAndDelete({ nomeSimulazione }),
                TheoreticalData.findOneAndDelete({ nomeSimulazione }),
                SimulatedData.findOneAndDelete({ nomeSimulazione }),
                FinanceData.findOneAndDelete({ nomeSimulazione })
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
                GeneralData.deleteMany({}),
                TheoreticalData.deleteMany({}),
                SimulatedData.deleteMany({}),
                FinanceData.deleteMany({})
            ])

            res.status(204).json({ message: "All simulations deleted successfully!" });

        } catch (error) {
            res.status(500).json({ message: "Server error!", message: error.message || "Server error!" });
        }
    }

module.exports = { simulationFormReport, sowingReport, theoreticalDataReport, simulatedDataReport, financeDataReport, simulationReportID, formReportID, sowingReportID, theoreticalDataReportID, simulatedDataReportID, financeDataReportID, fullReport, deleteReport, deleteAllReports };