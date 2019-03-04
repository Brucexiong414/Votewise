import React, {Component} from "react";
import {Modal} from 'react-bootstrap';
import "./CardStyle.css"
import { API } from "aws-amplify";

class FoodCard extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      voteList: ["Dinner               6:30pm"],
      show: false,
      currentTitle: "",
      currentTime: ""
    }
  }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
  }


  handleSubmit= async event => {
    event.preventDefault();

      if (this.state.currentTitle.length < 3) {
          alert('please enter a valid event name');
          this.setState({
              currentTitle: "",
              currentTime: ""
          });

          return;
      }

      let timeRegex = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;

      if (!timeRegex.test(this.state.currentTime)) {
          alert('Please use 24h time system in a format HH:MM');
          this.setState({
              currentTime: ""
          });

          return;
      }

    let result = "";

    result += this.state.currentTitle;
    result += "     ";
    result += this.state.currentTime;

    let newList = this.state.voteList;
    newList.push(result);
    this.setState({
      voteList: newList,
      currentTitle: "",
      currentTime: "",
      show: false
    })

      try {
          await this.createEvent({
              event: this.state.voteList[this.state.voteList.length - 1],
              choices: {}
          });
      } catch (e) {
          alert(e);
//        this.setState({ isLoading: false });
      }
  }

    createEvent(vote) {
        return API.post("votes", "/votes", {
            body: vote
        });
  }

  handleTitleChange(event) {
    this.setState({currentTitle: event.target.value});
  }

  handleTimeChange(event) {
    this.setState({currentTime: event.target.value});
  }

  render() {
    return (
      <div>
        <ul>
          {this.renderItems()}
        </ul>
        <div className="modal-container">
          <button className="myButton" onClick={this.handleShow}/>
          <Modal
            show={this.state.show}
            onHide={this.handleHide}
            container={this}
            aria-labelledby="contained-modal-title"
          >
            <Modal.Header closeButton onClick={this.handleClose}>
              <Modal.Title id="contained-modal-title">
                Create new Vote
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>
                    Title:
                    <input className="titleInput" type="text" value={this.state.currentTitle}
                           onChange={this.handleTitleChange}/>
                  </label>
                </div>
                <div>
                  <label>
                    Time:
                    <input className="timeInput" type="text" value={this.state.currentTime}
                           onChange={this.handleTimeChange}/>
                  </label>
                </div>
                <input type="submit" value="Submit"/>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }

  renderItems() {
    let items = [];
    for (let i = 0; i < this.state.voteList.length; i++) {
      items.push(<li>{this.state.voteList[i]}</li>)
    }
    return (<div>{items}</div>)
  }
}

export default FoodCard;