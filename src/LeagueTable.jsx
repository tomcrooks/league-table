import React, { Component } from 'react';
import LeagueList from './LeagueList';

class LeagueTable extends Component {

    state = {
        users: [
            { name: 'Tom Crooks', regDate: 'reg date', email:'thomas.crooks"pimberly.com' },
            { name: 'Tom Crooks', regDate: 'reg date', email:'thomas.crooks"pimberly.com' },
            { name: 'Tom Crooks', regDate: 'reg date', email:'thomas.crooks"pimberly.com' },
            { name: 'Tom Crooks', regDate: 'reg date', email:'thomas.crooks"pimberly.com' },
        ]
    }

    render() {
        return (
            <table className="ui compact celled definition table">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Registration Date</th>
                    <th>E-mail address</th>
                    <th>Premium Plan</th>
                    </tr>
                </thead>
                <LeagueList users={this.state.users}/>
            </table>
        )
    }
}

export default LeagueTable