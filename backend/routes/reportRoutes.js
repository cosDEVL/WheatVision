const express = require('express');
const router = express.Router();

const { simulationFormReport, sowingReport, theoreticalDataReport, simulatedDataReport, financeDataReport, simulationReportID, formReportID, sowingReportID, theoreticalDataReportID, simulatedDataReportID, financeDataReportID, fullReport, deleteReport, deleteAllReports } = require('../controllers/reportController');

router.get('/simulationFormReport', simulationFormReport);
router.get('/sowingDataReport', sowingReport);
router.get('/theoreticalDataReport', theoreticalDataReport);
router.get('/simulatedDataReport', simulatedDataReport);
router.get('/financeDataReport', financeDataReport);

router.get('/simulationID/:nomeSimulazione', simulationReportID);


router.get('/formDataID/:nomeSimulazione', formReportID);
router.get('/sowingInfoID/:nomeSimulazione', sowingReportID);
router.get('/theoreticalDataReportID/:nomeSimulazione', theoreticalDataReportID);
router.get('/simulatedDataReportID/:nomeSimulazione', simulatedDataReportID);
router.get('/financeDataReportID/:nomeSimulazione', financeDataReportID);

router.get('/fullReport', fullReport);

router.delete('/deleteReport/:nomeSimulazione', deleteReport);
router.delete('/deleteAllReports', deleteAllReports);

module.exports = router;
