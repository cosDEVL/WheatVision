const express = require('express');
const router = express.Router();

const { simulationFormReport, simulationReportId, fullReport, deleteReport, deleteAllReports } = require('../controllers/reportController');

// /API/REPORT

// restituisce tutti i form presenti nel database 
router.get('/simulationFormReport', simulationFormReport); 

// restituisce il report di simulazione associato al parametro nomeSimulazione
router.get('/simulationID/:nomeSimulazione', simulationReportId); 

// restituisce tutti i report presenti fornendo di tutte le simulazioni form e i dati generati
router.get('/fullReport', fullReport); 

// cancella il report di simulazione associato al parametro nomeSimulazione
router.delete('/deleteReport/:nomeSimulazione', deleteReport); 

// cancella tutte le simulazioni presenti nel database
router.delete('/deleteAllReports', deleteAllReports); 

module.exports = router;
