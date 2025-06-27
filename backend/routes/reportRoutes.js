const express = require('express');
const router = express.Router();

const { simulationFormReport, simulationReportID, fullReport, deleteReport, deleteAllReports } = require('../controllers/reportController');

router.get('/simulationFormReport', simulationFormReport);

router.get('/simulationID/:nomeSimulazione', simulationReportID);

router.get('/fullReport', fullReport);

router.delete('/deleteReport/:nomeSimulazione', deleteReport);
router.delete('/deleteAllReports', deleteAllReports);

module.exports = router;
