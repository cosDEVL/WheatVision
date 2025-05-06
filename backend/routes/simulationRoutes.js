const express = require("express");
const router = express.Router();

const { formInput, sowingInfo, theoreticalData, simulatedData, financeData } = require("../controllers/simulationController");

router.post("/form", formInput);
router.post("/sowingInfo", sowingInfo);
router.post("/theoreticalData", theoreticalData);
router.post("/simulatedData", simulatedData);
router.post("/financeData", financeData);



module.exports = router;