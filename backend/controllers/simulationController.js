const { createAndRunSimulation } = require('../service/simulationServices');

/**
 * 
 * @desc Gestisce la richiesta di creazione di una nuova simulazione
 * @route POST /api/simulation/startSimulation 
 */

const startSimulation = async (req, res, next) => {
    try {
        const results = await createAndRunSimulation(req.body);
        res.status(201).json(results);

    } catch (error) {
        next(error);
    }

}

module.exports = { startSimulation };