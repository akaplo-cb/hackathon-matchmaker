const COLUMNS = {
    timestamp: 0,
    email: 1,
    name: 2,
    whatBringsYouBy: 3,
    nameYourTeam: 4,
    listYourTeamMembers: 5,
    shortProjectDescription1: 6,
    wantMoreHelp: 7,
    programmingLanguages1: 8,
    hardware1: 9,
    projectCategory1: 10,
    environments1: 11,
    slackUsername: 12,
    shortProjectDescription2: 13,
    hardware2: 14,
    keySkills: 15,
    projectCategory2: 16,
    productArea: 17,
    isEngineer: 18,
    programmingLanguages2: 19,
    environments2: 20,
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
        COLUMNS.listYourTeamMembers, COLUMNS.programmingLanguages1, COLUMNS.programmingLanguages2, COLUMNS.environments1, COLUMNS.environments2
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