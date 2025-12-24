const CONFIG = {
    apiLocation: {
        latitude: 41.4584,
        longitude: 15.5519
    },
    precipitation_probability: {
        "January": {"mean": 0.225, "variance": 0.0425},
        "February": {"mean": 0.225, "variance": 0.0425},
        "March": {"mean": 0.1925, "variance": 0.0218},
        "April": {"mean": 0.1925, "variance": 0.0218},
        "May": {"mean": 0.1925, "variance": 0.0218},
        "June": {"mean": 0.124, "variance": 0.0904},
        "July": {"mean": 0.124, "variance": 0.0904},
        "August": {"mean": 0.124, "variance": 0.0904},
        "September": {"mean": 0.2075, "variance": 0.1268},
        "October": {"mean": 0.2075, "variance": 0.1268},
        "November": {"mean": 0.2075, "variance": 0.1268},
        "December": {"mean": 0.225, "variance": 0.0425},
    },
    margin: {
        "January": 2, "February": 3, "March": 3, "April": 4, "May": 4, "June": 5,
        "July": 5, "August": 5, "September": 4, "October": 3, "November": 2, "December": 2,
    },
}

module.exports = CONFIG;