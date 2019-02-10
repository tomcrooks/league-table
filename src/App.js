import React, { Component } from 'react';
import LeagueNavbar from './LeagueNavbar'
import LeagueTable from './LeagueTable';
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
