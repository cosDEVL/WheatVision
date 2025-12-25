const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/checkLiveState", async (req, res) => {
    try {
        // Questo invia un ping leggero a MongoDB restituendo { ok: 1 }
        await mongoose.connection.db.command({ ping: 1 });
        res.status(200).json("Server & DB active!");
    } catch (error) {
        // Se il DB e' caduto, questo messaggio lo andra' ad indicare.
        res.status(500).send("DB connection error!");
    }
});

module.exports = router;
