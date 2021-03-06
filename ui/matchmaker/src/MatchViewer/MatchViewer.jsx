import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Login from '../Login/Login';
import Individual from './Individual';
import Team from './Team';
import axios from 'axios';


const muiStyle = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
    },
});
class MatchViewer extends Component {
    state = { res: undefined };
    componentWillMount(pp, ps, ss) {
        const { email, type, onError } = this.props;
        axios.get(`http://localhost:8001/${type}?email=${email}`)
            .then(res => {
                this.setState({ res: res.data });
            })
            .catch(e => {
                if (e.response.data.message) {
                    onError(e.response.data.message);
                } else {
                    onError('An unknown error occurred');
                }
            });
    }

    render() {
        const { res } = this.state;
        const { classes, type } = this.props;
        if (res) {
            return (
                <Paper className={classes.root}>
                    {
                        type === 'individual' &&
                            <Individual res={ res }/>
                    }
                    {
                        type === 'team' &&
                            <Team res={ res }/>
                    }
                </Paper>

            );
        }
        return null
    }
}

export default withStyles(muiStyle)(MatchViewer);

// {"email":"akaplowitz@carbonblack.com","name":"Aaron Kaplowitz","teams":[{"name":"mongooses","members":["aaron","geoff"],"languages":["Python"],"environments":["Web UI (JS","etc)"],"description":"Desxc","hardware":1,"projectCategory":1,"points":5},{"name":"woof","members":["aaron","greg"],"languages":["Python","Golang"],"environments":[],"description":"ldkjfdklfj","points":2},{"name":"Matching Engines Everywhere","members":["slundgren","jclark","paul.drapeau"],"languages":["Python"],"environments":[],"description":"We're going to get a version of the endpoint rules matching engine developed by UAV running in a Defense backend to PoC using it as an additional analytics alerting engine.","projectCategory":1,"points":2},{"name":"CbD Ticketing Integrations","members":["Greg Daneault"],"languages":[],"environments":[],"description":"Many organizations who use CbD use ticketing systems to track the workflow. Based on customer interactions, they would prefer us to integrate with their systems and give access to alert exports rather than create our own workflow management in CbD. This team should include UX to design the system, backend to manage and store integrations, and UI to display the integration status and link off to these systems. ","projectCategory":1,"points":1}]}