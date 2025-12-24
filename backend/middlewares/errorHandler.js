/**
 * Middleware per gestire le rotte non trovate (404).
 * Viene eseguito se nessuna rotta ha gestito la richiesta
 */

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404).json({ message: "Resource not found..." });
    next(error); // Passa l'errore al gestore di errori successivo
}


/**
 * Middelware per la gestione di tutti gli errori.
 * Riceve gli errori passati da "next(error)"
 */
const errorHandler = (err, req, res, next) => {
    
    console.error(err);
    
    //Questo gestisce gli errori operazionali lanciati da AppError
    if (err.isOperational) { 
        return res.status(err.statusCode).json({ message: err.message })
    }

    if (err.name === 'ValidationError') {

        // Estrazione i messaggi d'errore in un array
        const errors = Object.values(err.errors).map(e => e.message);

        // Unisce tutti i messaggi in una singola stringa, separati da una virgola
        const message = `Errore nella validazione del Form: ${errors.join(', ')}`;
        return res.status(400).json({ message });

    }


    // Determina lo status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message });
}

module.exports = { notFound, errorHandler };