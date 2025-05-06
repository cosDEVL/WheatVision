const { getSeasonDates } = require('../seasonDates');
const [yearSeason, seasonsDates] = getSeasonDates(2023);

let templateSeasonsSimulated = [
    {
        yearRef: yearSeason,
        month: "October",
        startDate: `${yearSeason[0]}-10-01`,
        endDate: `${yearSeason[0]}-10-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "November",
        startDate: `${yearSeason[0]}-11-01`,
        endDate: `${yearSeason[0]}-11-30`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "December",
        startDate: `${yearSeason[0]}-12-01`,
        endDate: `${yearSeason[0]}-12-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "January",
        startDate: `${yearSeason[1]}-01-01`,
        endDate: `${yearSeason[1]}-01-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "February",
        startDate: `${yearSeason[1]}-02-01`,
        endDate: `${yearSeason[1]}-02-28`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "March",
        startDate: `${yearSeason[1]}-03-01`,
        endDate: `${yearSeason[1]}-03-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "April",
        startDate: `${yearSeason[1]}-04-01`,
        endDate: `${yearSeason[1]}-04-30`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "May",
        startDate: `${yearSeason[1]}-05-01`,
        endDate: `${yearSeason[1]}-05-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "June",
        startDate: `${yearSeason[1]}-06-01`,
        endDate: `${yearSeason[1]}-06-30`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "July",
        startDate: `${yearSeason[1]}-07-01`,
        endDate: `${yearSeason[1]}-07-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
    {
        yearRef: yearSeason,
        month: "Agaust",
        startDate: `${yearSeason[1]}-08-01`,
        endDate: `${yearSeason[1]}-08-31`,
        precipitationSum: null,
        meanTemp: null,
        meanHumidity: null
      },
]

const seasonalStdDev = {
    October: 3,
    November: 2.5,
    December: 2.5,
    January: 2.5,
    February: 3,
    March: 4,
    April: 4,
    May: 5,
    June: 6,
    July: 6,
    August: 6    
  };

module.exports = { templateSeasonsSimulated, seasonalStdDev };