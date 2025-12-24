var mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {});
        console.log("Connessione a MongoDB riuscita!");
    } catch(err) {
        console.log("Si e' verificato un errore nel collegamento con MongoDB", err);
        process.exit(1);
    }
}

module.exports = connectDB;