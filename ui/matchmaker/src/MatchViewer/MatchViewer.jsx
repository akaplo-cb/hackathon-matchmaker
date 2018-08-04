import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const muiStyle = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        height: '30rem'
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
});
class MatchViewer extends Component {
    state = { res: undefined };
    componentWillMount(pp, ps, ss) {
        const { email, type } = this.props;
        console.log('didupdate??');
        fetch(`http://localhost:8001/${type}?email=${email}`).then(res => {
            return res.json()
        }).then(j => this.setState({ res: j }));
    }

    render() {
        const { res } = this.state;
        const { classes } = this.props;
        if (res) {
            const bestMatch = res.teams[0].name;
            // if they didn't come sorted:
            /**
              teams.sort((a, b) => {
                   if (a.points > b.points) {
                       return -1;
                   } else if (b.points > a.points) {
                       return 1;
                   }
                   return 0;
              })
            */
            const headers = Object.keys(res.teams[0])
            console.log(headers);
            return (
                <Paper className={classes.root}>
                    {
                        res.teams.map(team => {
                            console.log(team)
                            return (
                                <Card className={classes.card}>
                                    <CardContent>
                                        { bestMatch === team.name &&
                                            <i>Best Match For You</i>
                                        }
                                        <Typography gutterBottom variant="headline" component="h2">
                                            { team.name }
                                        </Typography>
                                        <Typography component="i">
                                            { team.members.join(', ') }
                                        </Typography>
                                        <Typography component="i">
                                            { team.languages.join(', ')}
                                        </Typography>
                                        <Typography component="i">
                                            { team.environments.join(', ')}
                                        </Typography>
                                        <Typography component="p">
                                            { team.description}
                                        </Typography>
                                        <Typography component="p">
                                            { team.points}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button href='https://carbonblack.slack.com' size="small" color="primary">
                                            Learn more
                                        </Button>
                                    </CardActions>
                                </Card>
                            );
                        })
                    }
                </Paper>

            );
        }
        return null;
    }
}

export default withStyles(muiStyle)(MatchViewer);

// {"email":"akaplowitz@carbonblack.com","name":"Aaron Kaplowitz","teams":[{"name":"mongooses","members":["aaron","geoff"],"languages":["Python"],"environments":["Web UI (JS","etc)"],"description":"Desxc","hardware":1,"projectCategory":1,"points":5},{"name":"woof","members":["aaron","greg"],"languages":["Python","Golang"],"environments":[],"description":"ldkjfdklfj","points":2},{"name":"Matching Engines Everywhere","members":["slundgren","jclark","paul.drapeau"],"languages":["Python"],"environments":[],"description":"We're going to get a version of the endpoint rules matching engine developed by UAV running in a Defense backend to PoC using it as an additional analytics alerting engine.","projectCategory":1,"points":2},{"name":"CbD Ticketing Integrations","members":["Greg Daneault"],"languages":[],"environments":[],"description":"Many organizations who use CbD use ticketing systems to track the workflow. Based on customer interactions, they would prefer us to integrate with their systems and give access to alert exports rather than create our own workflow management in CbD. This team should include UX to design the system, backend to manage and store integrations, and UI to display the integration status and link off to these systems. ","projectCategory":1,"points":1}]}