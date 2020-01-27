import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <nav>
                <ul>
                    <li><Link to="/" className="nav-link">Races</Link></li>
                    <li><Link to="/create" className="nav-link">Add Race Result</Link></li>
                    <li><Link to="/user" className="nav-link">Create User</Link></li>
                </ul>
            </nav>
        )
    }
}