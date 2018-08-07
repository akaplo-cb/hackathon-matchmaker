const COLUMNS = {
    timestamp: 0,
    email: 1,
    name: 2,
    reason: 3,
    teamName: 4,
    teamMembers: 5,
    teamProjectDesc: 6,
    teamWantsHelp: 7,
    teamLangs: 8,
    teamDoesHardware: 9,
    teamProjectCategory: 10,
    teamEnvs: 11,
    individualSlack: 12,
    individualProjectDesc: 13,
    individualDoesHardware: 14,
    individualSkills: 15,
    individualProjectCategory: 16,
    individualProductArea: 17,
    individualIsEng: 18,
    individualLangs: 19,
    individualEnvs: 20,
    remoteEmployee: 21,
    willGoToOffice: 22,
    employmentDuration: 23,
    doneUninterruptedHackathon: 24
};
const COMMON_COLUMNS = {
    name: 1,
    email: 2,
    whatBringsYouBy: 3,
};

module.exports = {
    COLUMNS: COLUMNS,
    COMMON_COLUMNS: COMMON_COLUMNS,
    ARRAY_CELLS: [
        COLUMNS.teamMembers, COLUMNS.teamLangs, COLUMNS.individualLangs, COLUMNS.teamEnvs, COLUMNS.individualEnvs
    ],
    REASON_COLUMN_OPTIONS: {
        makeTeam: 'Make team',
        lookingForTeam: 'Looking for a team'
    },

    MAKE_TEAM_COLUMNS: {
        ...COMMON_COLUMNS
    },
    LOOKING_FOR_TEAM_COLUMNS: {
    ...COMMON_COLUMNS
    }
};