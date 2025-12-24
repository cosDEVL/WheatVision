const reportService = require('../service/reportServices');

/**
 * 
 * @desc Restituisce tutti i form presenti nel database
 * @route GET api/report/simulationFormReport
 */
const simulationFormReport = async (req, res, next) => {
    try {
        const forms = await reportService.getAllForms();
        res.status(200).json(forms);
    } catch(error) {
        next(error);
    }
}

/**
 * 
 * @desc Restituisce il report associato al parametro "nomeSimulazione"
 * @route GET api/report/simulationID/:nomeSimulazione
 */
const simulationReportId = async (req, res, next) => {
    try {
        const report = await reportService.getSimulationReportById(req.params.nomeSimulazione);
        res.status(200).json(report);
    } catch(error) {
        next(error);
    }
}

/**
 * 
 * @desc Restituisce tutti i report presenti nel database
 * @route GET api/report/fullReport
 */
const fullReport = async (req, res, next) => {
    try {
        const fullReport = await reportService.getFullReports();
        res.status(200).json(fullReport);
    } catch(error) {
        next(error);
    }
}

/**
 * 
 * @desc Cancella il report associato al parametro "nomeSimulazione"
 * @route DELETE api/report/deleteReport/:nomeSimulazione
 */
const deleteReport = async (req, res, next) => {
    try {
        await reportService.deleteReportById(req.params.nomeSimulazione);
        res.status(204).send(); // 204 No Content non deve avere un corpo
    } catch(error) {
        next(error);
    }
}

/**
 * 
 * @desc Cancella tutti i report presenti nel database
 * @route GET api/report/deleteAllReports
 */
const deleteAllReports = async (req, res, next) => {
    try {
        await reportService.deleteAllReports();
        res.status(204).send(); 
    } catch(error) {
        next(error);
    }
}


module.exports = {
    simulationFormReport,
    simulationReportId,
    fullReport,
    deleteReport,
    deleteAllReports
}