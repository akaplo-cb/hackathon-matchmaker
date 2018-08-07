import React, { Component } from 'react';
import TeamCard from "./TeamCard";

class Individual extends Component {
    filterTeams(teams) {
        return teams.map(team => {
            Object.keys(team).map(key => {
                if (team[key] === [] || !team[key]) {
                    delete team[key];
                }
            });
            return team;
        })
    }
    render() {
        const { res } = this.props;
        const bestMatch = res.teams[0].name;
        const teams = this.filterTeams(res.teams);
        return (
            <React.Fragment>
                {
                    teams.map(team => {
                        return (
                            <TeamCard isBestMatch={ bestMatch === team.name } team={ team }/>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}

export default (Individual);

// {"email":"akaplowitz@carbonblack.com","name":"Aaron Kaplowitz","teams":[{"name":"mongooses","members":["aaron","geoff"],"languages":["Python"],"environments":["Web UI (JS","etc)"],"description":"Desxc","hardware":1,"projectCategory":1,"points":5},{"name":"woof","members":["aaron","greg"],"languages":["Python","Golang"],"environments":[],"description":"ldkjfdklfj","points":2},{"name":"Matching Engines Everywhere","members":["slundgren","jclark","paul.drapeau"],"languages":["Python"],"environments":[],"description":"We're going to get a version of the endpoint rules matching engine developed by UAV running in a Defense backend to PoC using it as an additional analytics alerting engine.","projectCategory":1,"points":2},{"name":"CbD Ticketing Integrations","members":["Greg Daneault"],"languages":[],"environments":[],"description":"Many organizations who use CbD use ticketing systems to track the workflow. Based on customer interactions, they would prefer us to integrate with their systems and give access to alert exports rather than create our own workflow management in CbD. This team should include UX to design the system, backend to manage and store integrations, and UI to display the integration status and link off to these systems. ","projectCategory":1,"points":1}]}

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