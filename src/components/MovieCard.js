import React, {Component} from "react";
import {Modal} from 'react-bootstrap';
import {Link, withRouter} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./CardStyle.css"
import Details from "./detailsComponent/Details"
import IsLoading from "./isLoading"


class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      voteList: [],
      show: false,
      currentTitle: "",
      currentTime: "",
      isLoading: true
    }
  }

    async componentDidMount() {
        // if (!this.props.isAuthenticated) {
        //     return;
        // }

        try {
            const votes = await this.votes();
            let items = [];
            let leadingVotes = [];
            for (let i = 0; i < votes.length; i++) {  // query from data base to list all events
                if (votes[i].category === "movies") {
                    items.push(votes[i].event);
                    let choices = votes[i].choices;
                    if (choices) {
                      var max = -1, index = 0;
                      for (let j = 0; j < choices.length; j++) {
                        if (choices[j].currentVote > max) {
                          max = choices[j].currentVote;
                          index = j;
                        }
                      }
                      leadingVotes.push(votes[i].choices[index].name);
                    } else {
                      leadingVotes.push("No option created.");
                    }
                }
            }
            this.setState({
                voteList: items,
                isLoading: false,
                leadingVoteLists: leadingVotes
            });
        } catch (e) {
            alert(e);
        }
    }

  handleShow() {
    this.setState({show: true});
  }

  handleClose() {
    this.setState({show: false});
  }

  async handleSubmit(event) {
    event.preventDefault();
    let result = "";

    result += this.state.currentTitle;
    result += "     ";
    result += this.state.currentTime;

    let newList = this.state.voteList;
    newList.push(result);

      let temp = this.state.leadingVoteLists;
      temp.push("No option created.");

    this.setState({
      voteList: newList,
      currentTitle: "",
      currentTime: "",
      show: false,
        leadingVoteLists: temp
    });

      try {
          await this.createEvent({
              event: this.state.voteList[this.state.voteList.length - 1],
              category: "movie"
          });
      } catch (e) {
          alert(e);
      }

      try {
          await this.createEvent({
              event: this.state.voteList[this.state.voteList.length - 1] + '-',
          });
      } catch (e) {
          alert(e);
      }
  }

    votes() {
        let v = API.get("votes", "/votes");
        // v.then(result => {
        //     console.log(result);
        // })
        return v;
    }

    createEvent(vote) {
        let v = API.post("votes", "/votes", {
            body: vote
        });
        // v.then(result => {
        //   console.log(result);
        // })
        return v;
    }

  handleTitleChange(event) {
    this.setState({currentTitle: event.target.value});
  }

  handleTimeChange(event) {
    this.setState({currentTime: event.target.value});
  }

  render() {
    return (
        this.state.isLoading ? <div><IsLoading/></div> :
      <div>
        <ul className = "VoteList">
          {this.renderItems()}
        </ul>
          <Link className="historyLink"
                to={{pathname: "/history", state: { userId: this.props.id }}}>
              View History
          </Link>
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
      items.push(<Link key={i} to={{pathname: "/details",
          state: { title: "Movie", eventTitle: this.state.voteList[i], userId: this.props.id  }}}>
      <li className = "listItemVote">{this.state.voteList[i]} <pre className = "highestVote">{this.state.leadingVoteLists[i]}</pre> </li>
      </Link>)
    }
    return (<div>{items}</div>)
  }
}

export default MovieCard;
