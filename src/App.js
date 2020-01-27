import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/header.component";
import PaceChart from "./components/pace-chart.component";
import RacesList from "./components/races-list.component";
import EditRace from "./components/edit-race.component";
import CreateRace from "./components/create-race.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
        <Header />
        <PaceChart />
        {/* <RacesList /> */}
        <Route path="/" exact component={RacesList} />
        <Route path="/edit/:id" component={EditRace} />
        <Route path="/create" component={CreateRace} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;
