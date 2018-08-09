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
    skills: {
        textAlign: 'center',
        paddingLeft: '10%',
        paddingRight: '10%',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        fontSize: '115%',
        color: 'grey'
    }
});

const headers = {
    environments: {
        desc: 'Environments you\'re both looking for',
        array: true
    },
    individualDoesHardware: {
        desc: 'Does hardware',
        bool: true
    },
    individualEnvs: {
        desc: 'All environments they want to work in',
        array: true
    },
    individualIsEng: {
        desc: 'Is an engineer',
        bool: true
    },
    individualLangs: {
        desc: 'All languages they know',
        array: true
    },
    individualProductArea: {
        desc: 'Their product area'
    },
    individualProjectCategory: {
        desc: 'Type of project they want'
    },
    individualSlack: {
        desc: 'Their slack username'
    },
    languages: {
        desc: 'The programming languages they know',
        array: true
    }
};

const renderValue = (header, user) => {
    if (headers[header].array) {
        return user[header].join(', ')
    } else if (headers[header].bool) {
        return user[header].toString()
    } else {
        return user[header]
    }
};

const IndividualCard = ({ classes, isBestMatch, user }) => (
    <Card className={classes.card} key={user.name} >
        <CardContent>
            <Grid container>
                { isBestMatch &&
                    <Grid item xs={12}>
                        <i className={ classes.bestMatch }>Best Match For You</i>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        { user.name }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography className={ classes.skills }>
                        { user.individualSkills}
                    </Typography>
                </Grid>
                {
                    Object.keys(headers).map(header => {
                        return (
                            user[header] !== null && user[header] !== undefined && (!headers[header].array || headers[header].array && user[header].length > 0) &&
                            <Grid item xs={12} className={ classes.flex }>
                                <Typography className={ classes.spacing }>
                                    <i>{ headers[header].desc }:</i>
                                </Typography>
                                <Typography className={ classes.spacing }>
                                    { renderValue(header, user) }
                                </Typography>
                            </Grid>
                        )
                    })
                }
            </Grid>
        </CardContent>
        <CardActions>
            <Button variant={'outlined'} href='https://carbonblack.slack.com' size="small" color="primary">
                Message on slack
            </Button>
        </CardActions>
    </Card>
);

export default withStyles(muiStyle)(IndividualCard);