import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem  } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import MainPage from "./components/mainPage";


class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div className="App container">
            <Navbar fluid inverse collapseOnSelect style={{ padding: '10px'}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">
                            Votewise
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                        <Fragment>
                            <div className="lk">
                                <LinkContainer to="/signup">
                                    <NavItem>Sign up</NavItem>
                                </LinkContainer>
                                <p></p>
                                <LinkContainer to="/login">
                                    <NavItem>Log in</NavItem>
                                </LinkContainer>
                            </div>
                        </Fragment>
                </Navbar.Collapse>
            </Navbar>
            <Routes />
        </div>
    );
  }
}

export default App;

