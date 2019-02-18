import React, { Component, Fragment } from "react";
import "./Home.css";
import { LinkContainer } from "react-router-bootstrap";
import { Button  } from "react-bootstrap";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Votewise</h1>
                    {
                        this.props.isAuthenticated
                        ?
                            <Fragment>
                            <p>Click below to vote</p>
                                <LinkContainer to="/main">
                                <Button>Vote</Button>
                                </LinkContainer>
                                <h1></h1>
                                <LinkContainer to="/history">
                                    <Button>History</Button>
                                </LinkContainer>
                            </Fragment>
                        : <p>Sign in to vote for your favorite activity</p>
                    }
                </div>
            </div>
        );
    }
}