import React, { Component } from 'react';

class LeagueList extends Component {



    render() {
        console.log(this.props)
        return (
            <tbody>
                {this.props.users.map(usr => {
                    return (
                        <tr>
                            <td>{usr.name}</td>
                            <td>{usr.regDate}</td>
                            <td>{usr.email}</td>
                            <td>No</td>
                        </tr>
                    )
                })}
          </tbody>
        )
    }
}

export default LeagueList