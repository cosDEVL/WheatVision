const { randomUniform } = require('d3-random');


function calcUniformRandom(min, max){

        return parseFloat((randomUniform(min, max)()).toFixed(2))

}

module.exports = { calcUniformRandom };