import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header.component";
import RaceDataDisplay from "./components/race-data-display.component";
import EditRace from "./components/edit-race.component";
import CreateRace from "./components/create-race.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
        <Header />
        <RaceDataDisplay />
        {/* <Route path="/" exact component={RaceDataDisplay} /> */}
        <Route path="/edit/:id" component={EditRace} />
        <Route path="/create" component={CreateRace} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
