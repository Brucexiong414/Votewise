import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import "./Navigation.css";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <fragment>
            <div className="Navigation container">
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Votewise</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </div>
                <button className="myButton" />
            </fragment>
        );
    }
}

export default Navigation;