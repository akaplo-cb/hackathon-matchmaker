const {google} = require('googleapis');
const { COLUMNS, ARRAY_CELLS, LOOKING_FOR_TEAM_COLUMNS, MAKE_TEAM_COLUMNS, REASON_COLUMN_OPTIONS, COMMON_COLUMNS } = require('./constants');

/**
 *
 * @param req
 * @param res
 * @param next
 * @param auth
 */
function individualHandler(req, res, next, auth) {
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
                const userResponse = mapRowToObject(row);
                if (row[COMMON_COLUMNS.whatBringsYouBy] === REASON_COLUMN_OPTIONS.makeTeam) {
                    responses.makingTeam.push(userResponse);

                } else if (row[COMMON_COLUMNS.whatBringsYouBy] === REASON_COLUMN_OPTIONS.lookingForTeam) {
                    responses.lookingForTeam.push(userResponse);
                } else {
                    next('unexpected value for what brings you by')
                }
            });
            const userObj = responses.lookingForTeam.find(u => u.email === req.query.email);
            if (!userObj) {
                res.status(400)
                res.send({ message: 'No hackathon registration exists for that email.' })
            } else {
                const statsForUser = calculateSimilaritiesForSingleUser(userObj, responses.makingTeam);
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

function calculateSimilaritiesForSingleUser(user, teams) {
    let statsByTeam = { email: user.email, name: user.name, teams: [] };
    for(let team of teams) {
        let countOfPoints = 0;
        let statsForTeam = { name: team.teamName, members: team.teamMembers, languages: [], environments: [], description: team.teamProjectDesc };
        if (user.individualDoesHardware === team.teamDoesHardware) {
            statsForTeam.hardware = 1;
            countOfPoints++;
        }
        if (user.individualProjectCategory === team.teamProjectCategory) {
            statsForTeam.projectCategory = 1;
            countOfPoints++;
        }
        countOfPoints += user.individualLangs.filter(lang => team.teamLangs.includes(lang)).map(includedLang => statsForTeam.languages.push(includedLang)).length;
        countOfPoints += user.individualEnvs.filter(env => team.teamEnvs.includes(env)).map(env => statsForTeam.environments.push(env)).length;
        statsForTeam.points = countOfPoints;
        statsByTeam.teams.push(statsForTeam)
    }
    statsByTeam.teams.sort((a, b) => {
        if (a.points < b.points) {
            return 1;
        } else if (a.points > b.points) {
            return -1;
        }
        return 0;
    } );
    return statsByTeam;
}

module.exports = {
    individualHandler: individualHandler
};