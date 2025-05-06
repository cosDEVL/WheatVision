let templateYieldData = {
    generalData:{
        density: null,
        TKW: null,
        germinability: null,
        sowingRate: null
    },

    theoreticalData: {
        yieldCalculatedPerHectares: null,
        tilleringIndex: 2,
        spikeletsIndex: 17,
        seedsIndex: 1.4,
        theoreticalNitrogen: null,
        theoreticalPhosphorus: null,
        theoreticalPotassium: null,
        theoreticalPrecipitations: null
    },

    simulatedData: {
        yieldSimulatedPerHectares: null,
        yieldSimulatedTotal: null,
        tilleringIndex: null,
        spikeletsIndex: null,
        seedsIndex: null,
        simulatedNitrogen: null,
        simulatedPhosphorus: null,
        simulatedPotassium: null,
        simulatedPrecipitations: null,
        hectolitreWeight: null
    },
    financeData: {
        wheatSeedPricePerHectares: null, // €/ton => prezzo delle sementi per tonnellate
        wheatSeedPriceTotal: null,
        wheatType: null,
        durumWheatPricePerTons: null,
        durumWheatPriceTotal: null
    }
}

module.exports = { templateYieldData };