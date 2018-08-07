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
        marginBottom: '1rem'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});

const headers = {
    environments: {
        desc: 'Environments You Share',
        array: true
    },
    individualDoesHardware: {
        desc: 'Does hardware',
        bool: true
    },
    individualEnvs: {
        desc: 'Environments they know',
        array: true
    },
    individualIsEng: {
        desc: 'Is an engineer',
        bool: true
    },
    individualLangs: {
        desc: 'Languages they know',
        array: true
    },
    individualProductArea: {
        desc: 'Their normal Cb product area'
    },
    individualProjectCategory: {
        desc: 'Project type they want to work on'
    },
    individualSkills: {
        desc: 'Their skills'
    },
    individualSlack: {
        desc: 'Their slack username'
    },
    languages: {
        desc: 'The programming languages they know',
        array: true
    },
    points: {
        desc: 'The total number of points'
    }
};

const renderValue = (header, user) => {
    if (headers[header].array) {
        return user[header].join(', ')
    } else if (headers[header].bool) {
        console.log(user)
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
                        <i>Best Match For You</i>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Typography gutterBottom variant="headline" component="h2">
                        { user.name }
                    </Typography>
                </Grid>
                {
                    Object.keys(headers).map(header => {
                        return (
                            user[header] !== null && user[header] !== undefined &&
                            <Grid item xs={12}>
                                <Typography>
                                    { headers[header].desc }: {
                                        renderValue(header, user)
                                }
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