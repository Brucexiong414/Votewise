import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Modal } from 'react-bootstrap';
import "./Navigation.css";

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {show: false};
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <fragment>
            <div className="Navigation container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">Votewise</a>
                        </Navbar.Brand>
                    </Navbar.Header>
            </div>
                <div className="modal-container" >
                <button className="myButton" onClick={this.handleShow}/>
                    <Modal
                        show={this.state.show}
                        onHide={this.handleHide}
                        container={this}
                        aria-labelledby="contained-modal-title"
                    >
                        <Modal.Header>
                            <Modal.Title id="contained-modal-title">
                                Choose the event type and time
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form action="/form_handler" method="post">
                                <div>
                                    <label htmlFor="name">Event:</label>
                                    <input type="text" id="name" name="somename"/>
                                    <h1></h1>
                                    <label htmlFor="time">Time:</label>
                                    <input type="text" id="time" name="time"/>
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button type="submit" onClick={this.handleClose}>Submit</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </fragment>
        );
    }
}

export default Navigation;