const express = require("express");
const router = express.Router();

const { formInput, simulationData} = require("../controllers/simulationController");

router.post("/form", formInput);
router.post("/simulationData", simulationData);




module.exports = router;