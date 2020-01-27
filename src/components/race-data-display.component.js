import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RaceRow = props => (
    <tr>
        <td>{props.race.date.substring(0,10)}</td>
        <td>{props.race.raceName}</td>
        <td>{props.race.distanceMiles}</td>
        <td>{props.race.time}</td>
        <td>{props.race.pace}</td>
        <td>
            <Link to={"/edit/"+props.race._id}>edit</Link> | <a href="#" onClick={() => { props.deleteRace(props.race._id)}}>delete</a>
        </td>        
    </tr>
)

const DistanceCheckbox = props => (
    <label htmlFor={props.distance.distanceName} className={props.distance.distanceName}>
        {props.distance.displayName}
        <input type="checkbox" 
            name={props.distance.distanceName}
            value={props.distance.distanceName}
            defaultChecked="checked" />
    </label>
)

const RaceDataPoint = props => (
    <circle
        cx="300"
        cy="200"
        r="2"
        className={props.race.distanceName}>
            <title>{props.race.raceName}, {props.race.date}</title>
    </circle>
)

export default class RaceDataDisplay extends Component {
    constructor(props) {
        super(props);

        this.deleteRace = this.deleteRace.bind(this);

        this.state = { races: [] };
    }

    componentDidMount() {
        //get list of exercises from database
        axios.get('http://localhost:8000/races/')
            .then(response => {
                this.setState({
                    races: response.data
                })
            })
            .catch((error => {
                console.log(error);
            }))
    }

    deleteRace(id) {
        axios.delete('http://localhost:5000/races/' + id)
            .then(response => console.log(response.data));
        
        // filter away the row from this id to hide it from the table
        this.setState({
            races: this.state.races.filter(el => el._id !== id)
        })
    }

    raceList() {
        return this.state.races.map(currentRace => {
            return <RaceRow race={currentRace} deleteRace={this.deleteRace} key={currentRace._id} />;
        })
    }

    distanceCheckBoxes() {
        const distanceOptions = [
            {distanceName: 'five-k', miles: 3.1, displayName: '5K' },
            {distanceName: 'five-mile', miles: 5, displayName: '5 Mile' },
            {distanceName: 'ten-k', miles: 6.2, displayName: '10K' },
            {distanceName: 'half-marathon', miles: 13.1, displayName: 'Half Marathon' },
            {distanceName: 'marathon', miles: 26.2, displayName: 'Marathon' }
        ]
        return distanceOptions.map(option => {
            return <DistanceCheckbox distance={option} />
        })
    }

    paceGraphItems() {
        return this.state.races.map(currentRace => {
            return (
                <RaceDataPoint race={currentRace} key={currentRace._id} />
            );
        })
    }

    render() {
        return (
            <main>
                <section id="pace-graph-container">
                    <div id="race-type-toggle">
                        { this.distanceCheckBoxes() }
                    </div>
                    <svg width="500" height="300" viewBox="0 0 500 300">
                        { this.paceGraphItems() }
                    </svg>
                </section>
                <section id="race-table-container">
                    <table id="race-table">
                        <thead>
                            <tr>
                                <th>Date</th>                            
                                <th>Race</th>
                                <th>Miles</th>
                                <th>Time</th>
                                <th>Pace</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.raceList() }
                        </tbody>
                    </table>      
                </section>
            </main>
            
        )
    }
}