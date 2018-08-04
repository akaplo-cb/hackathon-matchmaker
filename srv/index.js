const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { authorize } = require('./auth');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/', (req, res, next) => {
    loadCredentials((auth) => {
        console.log('hi');
        listMajors(req, res, next, auth);
    })
});

app.listen(80, () => console.log('300000000yay'));

const { COLUMNS, ARRAY_CELLS, LOOKING_FOR_TEAM_COLUMNS, MAKE_TEAM_COLUMNS, REASON_COLUMN_OPTIONS, COMMON_COLUMNS } = require('./constants');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function loadCredentials(cb) {
    // Load client secrets from a local file.
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Sheets API.
        authorize(JSON.parse(content), (auth) => cb(auth));
    });
}


/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(req, res, next, auth) {
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
            const userObj = responses.lookingForTeam.find(u => u.email === 'akaplowitz@carbonblack.com');
            if (!userObj) {
                next('unable to find a signup under that email address.')
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
        let statsForTeam = { name: team.nameYourTeam, members: team.listYourTeamMembers, languages: [], environments: [], description: team.shortProjectDescription1 };
        if (user.hardware2 === team.hardware1) {
            statsForTeam.hardware = 1;
            countOfPoints++;
        }
        if (user.projectCategory2 === team.projectCategory1) {
            statsForTeam.projectCategory = 1;
            countOfPoints++;
        }
        countOfPoints += user.programmingLanguages2.filter(lang => team.programmingLanguages1.includes(lang)).map(includedLang => statsForTeam.languages.push(includedLang)).length;
        countOfPoints += user.environments2.filter(env => team.environments1.includes(env)).map(env => statsForTeam.environments.push(env)).length;
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

function prettyPrintMatchesForUser(matches) {
    console.log(`\nHey there ${matches.name}!\nWe found ${matches.teams.length} possible teams for you to join.`)
    for (let team of matches.teams) {
        console.log(`\n\n-------Team ${ team.name }--------\n`)
        console.log(`Members: ${ team.members.toString() }`)
        console.log(`Project description:\n${ team.description }\n`)
    }
}