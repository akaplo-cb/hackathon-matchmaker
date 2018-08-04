import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

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

        if (res) {
            console.log(res.body)
            return (
                <React.Fragment>
                    <span>{res.name}</span>
                    {
                        res.teams.map(team => {
                            return (
                                <Paper>
                                    <div>{team.name}</div>
                                    <div>{team.members}</div>
                                    <div>{team.languages}</div>
                                </Paper>
                            );
                        })
                    }
                </React.Fragment>

            );
        }
        return null;
    }
}

export default MatchViewer;

// {"email":"akaplowitz@carbonblack.com","name":"Aaron Kaplowitz","teams":[{"name":"mongooses","members":["aaron","geoff"],"languages":["Python"],"environments":["Web UI (JS","etc)"],"description":"Desxc","hardware":1,"projectCategory":1,"points":5},{"name":"woof","members":["aaron","greg"],"languages":["Python","Golang"],"environments":[],"description":"ldkjfdklfj","points":2},{"name":"Matching Engines Everywhere","members":["slundgren","jclark","paul.drapeau"],"languages":["Python"],"environments":[],"description":"We're going to get a version of the endpoint rules matching engine developed by UAV running in a Defense backend to PoC using it as an additional analytics alerting engine.","projectCategory":1,"points":2},{"name":"CbD Ticketing Integrations","members":["Greg Daneault"],"languages":[],"environments":[],"description":"Many organizations who use CbD use ticketing systems to track the workflow. Based on customer interactions, they would prefer us to integrate with their systems and give access to alert exports rather than create our own workflow management in CbD. This team should include UX to design the system, backend to manage and store integrations, and UI to display the integration status and link off to these systems. ","projectCategory":1,"points":1}]}