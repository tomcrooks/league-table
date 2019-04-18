import React, { Component } from 'react';
import LeagueNavbar from './navbar/LeagueNavbar'
import LeagueTable from './table/LeagueTable';
import './App.css';

class App extends Component {
	render() {
		return (
			<div>
				<LeagueNavbar/>
				<LeagueTable/>
			</div>
		)
	}
}

export default App;
