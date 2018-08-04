const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const { authorize } = require('./auth');
const express = require('express');
const { individualHandler } = require('./individual');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/individual', (req, res, next) => {
    loadCredentials((auth) => {
        console.log('hi');
        individualHandler(req, res, next, auth);
    })
});

app.get('/team', (req, res, next) => {
    loadCredentials((auth) => {
        console.log('hi');
        individualHandler(req, res, next, auth);
    })
});

app.listen(8001, () => console.log('300000000yay'));

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

function prettyPrintMatchesForUser(matches) {
    console.log(`\nHey there ${matches.name}!\nWe found ${matches.teams.length} possible teams for you to join.`)
    for (let team of matches.teams) {
        console.log(`\n\n-------Team ${ team.name }--------\n`)
        console.log(`Members: ${ team.members.toString() }`)
        console.log(`Project description:\n${ team.description }\n`)
    }
}