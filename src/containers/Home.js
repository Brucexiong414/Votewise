import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1>Votewise</h1>
                    <p>Sign in to vote for your favorite activity</p>
                </div>
            </div>
        );
    }
}