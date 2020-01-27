import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateRace extends Component {
    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDistance = this.onChangeDistance.bind(this);
        this.onChangeRaceName = this.onChangeRaceName.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangePace = this.onChangePace.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            date: new Date(),
            distanceName: "",
            raceName: "",
            distanceMiles: 0,
            time: "",
            pace: "",
            username: "",
            users: [],
            distanceOptions: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/users')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
        this.setState({
            distanceOptions: [
                {distanceName: 'five-k', miles: 3.1, displayName: '5K' },
                {distanceName: 'ten-k', miles: 6.2, displayName: '10K' },
                {distanceName: 'five-mile', miles: 5, displayName: '5 Mile' },
                {distanceName: 'half-marathon', miles: 13.1, displayName: 'Half Marathon' },
                {distanceName: 'marathon', miles: 26.2, displayName: 'Marathon' }
            ]
        })
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onChangeDistance(e) {
        const selectedDistance = e.target.options[e.target.options.selectedIndex];
        this.setState({
            distanceName: selectedDistance.getAttribute('distance-name'),
            distanceMiles: Number(e.target.value)
        });
    }

    onChangeRaceName(e) {
        this.setState({
            raceName: e.target.value
        });
    }

    onChangeTime(e) {
        this.setState({
            // check that pace & time match, warn
            time: e.target.value
        });
    }

    onChangePace(e) {
        this.setState({
            // check that pace & time match, warn
            pace: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        const race = {
            date: this.state.date,
            distanceName: this.state.distanceName,
            raceName: this.state.raceName,
            distanceMiles: this.state.distanceMiles,
            time: this.state.time,
            pace: this.state.pace,
            username: this.state.username
        }

        console.log(race);
        
        axios.post('http://localhost:8000/races/add', race)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Add a Race Result</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                // display an option within the select box for each user in the user array
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Race Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />                            
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Race Name: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.raceName}
                            onChange={this.onChangeRaceName}
                            />
                    </div>
                    <div className="form-group">
                        <label>Distance: </label>
                        <select ref="distanceInput"
                            required
                            className="form-control"
                            value={this.state.distanceName}
                            onChange={this.onChangeDistance}>
                                {
                                    // display an option within the select box for each user in the user array
                                    this.state.distanceOptions.map((item) => {
                                        return (
                                            <option 
                                                key={item.distanceName}
                                                distance-name={item.distanceName}
                                                value={item.miles}>
                                                    {item.displayName}
                                                </option>
                                        );
                                    })                                            
                                }
                        </select>                        
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.time}
                            onChange={this.onChangeTime}
                            />
                    </div>
                    <div className="form-group">
                        <label>Pace: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.pace}
                            onChange={this.onChangePace}
                            />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Race Result" className="btn" />
                    </div>
                </form>
            </div>
        )
    }
}