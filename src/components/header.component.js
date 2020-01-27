import React, { Component } from 'react';

import Navbar from "./navbar.component";
import HeaderLogo from "./header-logo.component";
import Search from "./search.component";

export default class Header extends Component {
    render() {
        return (
            <header>
                <HeaderLogo />
                <Navbar />
                {/* <Search /> */}
            </header>
        )
    }
}
