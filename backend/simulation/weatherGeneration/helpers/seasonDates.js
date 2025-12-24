function getSeasonDates (year) {
    const yearSeason = [ year, year+1 ];
    const seasonsDates = {
        September: [`${yearSeason[0]}-09-01`, `${yearSeason[0]}-09-30`],
        October: [`${yearSeason[0]}-10-01`, `${yearSeason[0]}-10-31`],
        November: [`${yearSeason[0]}-11-01`, `${yearSeason[0]}-11-30`],
        December: [`${yearSeason[0]}-12-01`, `${yearSeason[0]}-12-31`],
        January: [`${yearSeason[1]}-01-01`, `${yearSeason[1]}-01-31`],
        February: [`${yearSeason[1]}-02-01`, `${yearSeason[1]}-02-28`],
        March: [`${yearSeason[1]}-03-01`, `${yearSeason[1]}-03-31`],
        April: [`${yearSeason[1]}-04-01`, `${yearSeason[1]}-04-30`],
        May: [`${yearSeason[1]}-05-01`, `${yearSeason[1]}-05-31`],
        June: [`${yearSeason[1]}-06-01`, `${yearSeason[1]}-06-30`],
        July: [`${yearSeason[1]}-07-01`, `${yearSeason[1]}-07-31`],
        August: [`${yearSeason[1]}-08-01`, `${yearSeason[1]}-08-31`]
    }

    return [yearSeason, seasonsDates];
}

module.exports = { getSeasonDates };