const Form = require("../models/formInput");
const SimulationData = require("../models/simulationData");

const AppError = require("../utils/AppError");

const getAllForms = async () => {
  const forms = await Form.find();
  if (!forms || forms.length === 0) {
    throw new AppError("Nessuna Simulazione trovata", 404);
  }

  return forms;
};

const getSimulationReportById = async (nomeSimulazione) => {
  const [formInfo, simulationData] = await Promise.all([
    Form.findOne({ nomeSimulazione }),
    SimulationData.findOne({ SimulationName: nomeSimulazione }),
  ]);

  if (!formInfo) throw new AppError("Simulazione non trovata", 404);

  return { formInfo, simulationData };
};

const getFullReports = async () => {
  const fullReports = await Form.aggregate([
    {
      $lookup: {
        from: "simulationdatas",
        localField: "nomeSimulazione",
        foreignField: "SimulationName",
        as: "simulationData",
      },
    },
    {
      $project: {
        _id: 0,
        simulationForm: "$$ROOT",
        simulationData: "$simulationData",
      },
    },
  ]);

  if (!fullReports || fullReports.length === 0)
    throw new AppError("Nessun report trovato!", 404);

  return fullReports;
};

const deleteReportById = async (nomeSimulazione) => {
  const form = await Form.findOne({ nomeSimulazione });
  if (!form) throw new AppError("Simulazione non trovata!", 404);

  await Promise.all([
    Form.findOneAndDelete({ nomeSimulazione }),
    SimulationData.findOneAndDelete({ SimulationName: nomeSimulazione }),
  ]);
};

const deleteAllReports = async () => {
  await Promise.all([Form.deleteMany(), SimulationData.deleteMany()]);
};

module.exports = {
  getAllForms,
  getSimulationReportById,
  getFullReports,
  deleteReportById,
  deleteAllReports,
};
