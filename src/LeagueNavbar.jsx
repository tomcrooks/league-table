import React, { Component } from 'react';
import LeagueTable from './LeagueTable';    

class LeagueNavbar extends Component {
    // state = {}

    render() {
        return (
            <div id="league-table-navbar" className="container-fluid full">
                <h1>League Table!</h1>
                <div className="ui grid">
                    <div className="row">
                        <div className="two wide column" style={{ top: '10px' }}>
                            <button
                                className="ui primary button">
                                Show type: 'test'
                                <span className="caret"></span>
                            </button>
                        </div>
                        <div className="two wide column" style={{ top: '10px' }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search..."
                                // value={searchValue}
                                // onChange={handleSearchChange} 
                                />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LeagueNavbar;