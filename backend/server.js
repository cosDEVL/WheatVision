require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const reportRoutes = require("./routes/reportRoutes");
const simulationRoutes = require("./routes/simulationRoutes");
const heartBeat = require("./routes/heartBeat");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();

// Middleware CORS
app.use(cors());

// Converte i dati in arrivo dalle richieste HTTP in formato JSON
app.use(express.json());

// Rotte principali
app.use("/api/report", reportRoutes);
app.use("/api/simulation", simulationRoutes);

// Questa rotta serve a tenere attivo sia Render (backend) che Altas (database).
app.use("/health", heartBeat);

// Middleware per la gestione degli errori
app.use(notFound);
app.use(errorHandler);

// funzione per avviare il server Express
const startServer = async () => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, "0.0.0.0", () =>
        console.log(
            `Server listening on port ${PORT}...\n(Waiting for Database...)`
        )
    );

    connectDB();
    // console.log("Connessione al DataBase riuscita...");
};

startServer();
