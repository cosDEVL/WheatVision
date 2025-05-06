require("dotenv").config();
const express = require('express');
const cors = require("cors");
const path = require("path");
const connectDB = require('./config/db');

const reportRoutes = require("./routes/reportRoutes");
const simulationRoutes = require("./routes/simulationRoutes");

const app = express()

//setup CORS
app.use(cors());

//Connect DataBasa
connectDB();

// Parse incoming data from HTTP requests to JSON format
app.use(express.json());


//Routes
app.use("/api/report", reportRoutes);
app.use("/api/simulation", simulationRoutes);


// Open connection on PORT 8000 or 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`App listening on port ${PORT}!`));