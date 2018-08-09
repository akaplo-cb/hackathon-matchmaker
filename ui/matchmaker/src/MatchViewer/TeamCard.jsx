import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const muiStyle = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
    },
    card: {
        marginBottom: '1rem',
        marginLeft: '2rem',
        marginRight: '2rem'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    spacing: {
        paddingTop: '0.5rem'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    bestMatch: {
        color: 'green',
        fontWeight: 'bold'
    },
    owner: {
        fontSize: '115%',
        color: 'grey'
    },
    projDesc: {
        fontSize: '85%',
        textAlign: 'left',
        paddingLeft: '15%',
        paddingRight: '15%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
    }

});

const headers = {
    teamMembers: {
        desc: 'Members',
        array: true
    },
    teamProjectCategory: {
        desc: 'Project type'
    },
    environments: {
        desc: 'Environments you have in common',
        array: true
    },
    languages: {
        desc: 'Languages you have in common',
        array: true
    },
    teamDoesHardware: {
        desc: 'Is a hardware team:',
        bool: true
    },
    teamEnvs: {
        desc: 'Environments they\'ll be working in',
        array: true
    },
    teamLangs: {
        desc: 'Languages they\'ll be working in',
        array: true
    }
};
const renderValue = (header, team) => {
    if (headers[header].array) {
        return team[header].join(', ')
    } else if (headers[header].bool) {
        return team[header].toString()
    } else {
        return team[header]
    }
};

const TeamCard = ({ classes, isBestMatch, team }) => (
    <Card className={classes.card} key={ team.name }>
        <CardContent>
            { isBestMatch &&
            <i className={ classes.bestMatch }>Best Match For You</i>
            }
            <Typography gutterBottom variant="headline" component="h2">
                { team.teamName }
            </Typography>
            <Typography className={ classes.owner }>
                Team Contact: { team.name}
            </Typography>
            <Typography className={ classes.projDesc }>
                { team.teamProjectDesc}
            </Typography>
            {
                Object.keys(headers).map(header => {
                    console.log(header, team[header]);
                    return (
                        team[header] !== null && team[header] !== undefined && (!headers[header].array || headers[header].array && team[header].length > 0) &&
                        <Grid item xs={12} className={ classes.flex }>
                            <Typography className={ classes.spacing }>
                                <i>{ headers[header].desc }:</i>
                            </Typography>
                            <Typography className={ classes.spacing }>
                                 { renderValue(header, team) }
                            </Typography>
                        </Grid>
                    )
                })
            }
        </CardContent>
        <CardActions>
            <Button href='https://carbonblack.slack.com' size="small" color="primary">
                Learn more
            </Button>
        </CardActions>
    </Card>
);

export default withStyles(muiStyle)(TeamCard);