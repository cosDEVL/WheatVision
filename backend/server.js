require("dotenv").config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/db');

const reportRoutes = require("./routes/reportRoutes");
const simulationRoutes = require("./routes/simulationRoutes");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express()

// Middleware CORS
app.use(cors());

// Converte i dati in arrivo dalle richieste HTTP in formato JSON
app.use(express.json());



// Rotte principali
app.use("/api/report", reportRoutes);
app.use("/api/simulation", simulationRoutes);

// Middleware per la gestione degli errori
app.use(notFound);
app.use(errorHandler)

// funzione per avviare il server Express
const startServer = async () => {
    try {
        
        await connectDB(); 
        console.log("Connessione al DataBase riuscita...");
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, '0.0.0.0', () => console.log(`Server in ascolto sulla porta ${PORT}...`));

    } catch (error) {
        console.error("Failed to connect to the database. Server is not starting.", error);
        process.exit(1);
    }
}

startServer();