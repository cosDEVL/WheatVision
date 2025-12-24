const express = require("express");
const router = express.Router();

const { startSimulation } = require("../controllers/simulationController");

// /API/SIMULATION

// avvia la simulazione
router.post("/startSimulation", startSimulation); 

module.exports = router;