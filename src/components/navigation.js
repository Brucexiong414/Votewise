import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

class Navigation extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <div className="App container">
                <Navbar fluid inverse collapseOnSelect style={{ padding: '10px'}}>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Votewise
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>

                </Navbar>

            </div>
        );
    }
}

export default Navigation;