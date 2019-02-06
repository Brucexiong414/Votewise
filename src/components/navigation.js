import React, {Component} from "react";
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";
import {Modal} from 'react-bootstrap';
import "./Navigation.css";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {show: false};
  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
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
      </fragment>
    );
  }
}

export default Navigation;