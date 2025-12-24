const mongoose = require("mongoose");

const Form = require("../models/formInput");
const SimulationData = require("../models/simulationData");

const AppError = require("../utils/AppError");

const Simulation = require("../simulation/Simulation");

const createAndRunSimulation = async (formData) => {
  // Verifica che il form creato abbia un nome univoco
  const { nomeSimulazione } = formData;
  const existingSimulation = await Form.findOne({ nomeSimulazione });
  if (existingSimulation)
    throw new AppError("Esiste già una simulazione con questo nome", 400);

  // Avvio sessione
  const session = await mongoose.startSession();

  try {
    // Inizia la transazione
    session.startTransaction();

    // Crea una replica del documento Form
    // Questo rende non definitivo la creazione del documento nel database
    const formArray = await Form.create([formData], { session });
    const form = formArray[0];

    // Verifica se il form è stato creato
    if (!form)
      throw new AppError("Errore nella creazione del form di simulazione", 500);

    // Avvio della simulazione
    const simulation = new Simulation(form);
    const results = await simulation.run();

    // Crea il documento con i dati della simulazione
    await SimulationData.create(
      [
        {
          SimulationId: form._id,
          SimulationName: form.nomeSimulazione,
          GeneralData: results.generalData,
          CalculatedData: results.theoreticalData,
          SimulatedData: results.simulatedData,
          PhaseSimulationData: results.yieldPhaseSimulation,
          MeteoGenerated: results.weatherGenerated,
          FinancialData: results.financeData,
        },
      ],
      { session }
    );

    // Commit della transazione. A questo punto le modifiche diventano permanenti
    await session.commitTransaction();

    return results;
  } catch (error) {
    // In caso di errore la transazione viene abbortita
    await session.abortTransaction();
    throw error;
  } finally {
    // Chiusura della sessione alla fine di tutto
    session.endSession();
  }
};

module.exports = { createAndRunSimulation };
