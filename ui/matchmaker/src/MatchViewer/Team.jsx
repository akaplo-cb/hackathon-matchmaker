import React, { Component } from 'react';
import IndividualCard from "./IndividualCard";

class Team extends Component {
    filterIndividuals(individuals) {
        return individuals.map(i => {
            Object.keys(i).map(key => {
                if (i[key] === [] || i[key] === undefined || i[key] === null || i[key].length < 1) {
                    console.log(key + i[key])
                    delete i[key];
                }
            });
            return i;
        })
    }

    render() {
        const { res } = this.props;
        console.log(res);
        const users = this.filterIndividuals(res.users);
        const bestMatch = users[0].name;
        return (
            <React.Fragment>
                {
                    users.map(u => {
                        return (
                            <IndividualCard isBestMatch={ bestMatch === u.name } user={ u }/>
                        );
                    })
                }
            </React.Fragment>
        );
    }
}

export default (Team);
