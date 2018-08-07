const {google} = require('googleapis');
const { COLUMNS, ARRAY_CELLS, LOOKING_FOR_TEAM_COLUMNS, MAKE_TEAM_COLUMNS, REASON_COLUMN_OPTIONS, COMMON_COLUMNS } = require('./constants');


function teamHandler(req, res, next, auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
        spreadsheetId: '1PMpthgimWcj0ARuuybY1JNx35frFuiQCq_O0OLM4Uh8',
        range: 'A2:AA',
    }, (err, sheetsResponse) => {
        if (err) return next('The API returned an error: ' + err);
        const rows = sheetsResponse.data.values;
        if (rows.length) {
            const responses = {
                makingTeam: [],
                lookingForTeam: []
            };

            // Print columns A and E, which correspond to indices 0 and 4.
            rows.map((row) => {
                const teamResponse = mapRowToObject(row);
                if (row[COMMON_COLUMNS.whatBringsYouBy] === REASON_COLUMN_OPTIONS.makeTeam) {
                    responses.makingTeam.push(teamResponse);

                } else if (row[COMMON_COLUMNS.whatBringsYouBy] === REASON_COLUMN_OPTIONS.lookingForTeam) {
                    responses.lookingForTeam.push(teamResponse);
                } else {
                    next('unexpected value for what brings you by')
                }
            });
            const teamObj = responses.makingTeam.find(t => t.email === req.query.email);
            if (!teamObj) {
                res.status(400)
                res.send({ message: 'No team registration exists for that email.' })
            } else {
                const statsForUser = calculateSimilaritiesForTeam(teamObj, responses.lookingForTeam);
                // prettyPrintMatchesForUser(statsForUser);
                res.send(statsForUser);
            }
        } else {
            next('No data found.');
        }
    });
}

function mapRowToObject(row) {
    let responseObject = {};
    for(let key of Object.keys(COLUMNS)) {
        if(row[COLUMNS[key]] !== '') {
            const cell = row[COLUMNS[key]];
            if (ARRAY_CELLS.includes(COLUMNS[key])) {
                //convert all comma separated things into arrays
                responseObject[key] = cell.split(',').map(entry => entry.trim());
            } else if (cell === 'Yes' || cell === 'No') {
                // Convert all booleans into booleans
                cell === 'Yes' ? responseObject[key] = true : responseObject[key] = false;
            } else {
                responseObject[key] = cell;
            }

        }
    }
    return responseObject;
}

function calculateSimilaritiesForTeam(team, individuals) {
    console.log(team);
    console.log(individuals);
    let statsByUser = { email: team.email, name: team.name, users: [] };
    for(let individual of individuals) {
        let countOfPoints = 0;
        let statsForUser = {
            ...individual,
            languages: [],
            environments: []
        };
        if (individual.individualDoesHardware === team.teamDoesHardware) {
            statsForUser.hardware = 1;
            countOfPoints++;
        }
        if (individual.individualProjectCategory === team.teamProjectCategory) {
            statsForUser.projectCategory = 1;
            countOfPoints++;
        }
        if (!!individual.individualLangs && !!team.teamLangs) {
            countOfPoints += team.teamLangs
                .filter(lang => individual.individualLangs.includes(lang))
                .map(includedLang => statsForUser.languages.push(includedLang))
                .length;
        }
        if (!!individual.individualEnvs && !!team.teamEnvs) {
            countOfPoints += team.teamEnvs
                .filter(env => individual.individualEnvs.includes(env))
                .map(env => statsForUser.environments.push(env))
                .length;
        }
        statsForUser.points = countOfPoints;
        statsByUser.users.push(statsForUser)
    }
    statsByUser.users.sort((a, b) => {
        if (a.points < b.points) {
            return 1;
        } else if (a.points > b.points) {
            return -1;
        }
        return 0;
    } );
    console.log(statsByUser);
    return statsByUser;
}

module.exports = {
    teamHandler: teamHandler
};