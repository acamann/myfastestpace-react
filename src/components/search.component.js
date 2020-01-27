import React, { Component } from 'react';

export default class Search extends Component {
    render() {
        return (
            <form id="search-form">
                <input /><a href="#"><i className="fas fa-search"></i></a>
            </form>
        )
    }
}