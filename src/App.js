import React, { Component, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import {Navbar, NavItem  } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes";
import { Auth } from "aws-amplify";


class App extends Component {
  constructor(props) {
    super(props);

      this.state = {
          isAuthenticated: false,
          isAuthenticating: true
      };
  }

    async componentDidMount() {
        try {
            await Auth.currentSession();
            this.userHasAuthenticated(true);
        }
        catch(e) {
            if (e !== 'No current user') {
                alert(e);
            }
        }

        this.setState({ isAuthenticating: false });
    }

    userHasAuthenticated = authenticated => {
        this.setState({ isAuthenticated: authenticated });
    }

    handleLogout = async event => {
        await Auth.signOut();

        this.userHasAuthenticated(false);
        this.props.history.push("/login");
    }

  render() {
      const childProps = {
          isAuthenticated: this.state.isAuthenticated,
          userHasAuthenticated: this.userHasAuthenticated
      };

    return (
        !this.state.isAuthenticating &&
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
                    {this.state.isAuthenticated
                        ?
                        <div className="lk1">
                        <NavItem onClick={this.handleLogout}>Log out</NavItem>
                        </div>
                        : <Fragment>
                            <div className="lk">
                            <LinkContainer to="/signup">
                                <NavItem>Signup</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/login">
                                <NavItem>Login</NavItem>
                            </LinkContainer>
                            </div>
                        </Fragment>
                    }
                </Navbar.Collapse>
            </Navbar>
            <Routes childProps={childProps} />
        </div>
    );
  }
}

export default withRouter(App);
