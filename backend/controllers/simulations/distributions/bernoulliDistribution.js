const {randomBernoulli} = require('d3-random');


function calcBernoulliDistribution(p){

    return randomBernoulli(p)();

}

module.exports = {calcBernoulliDistribution};