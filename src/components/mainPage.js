import React, {Component} from "react"
import {Row, Col} from "react-bootstrap"
import FoodCard from "./FoodCard";
import MovieCard from "./MovieCard";
import "./mainPage.css"
import MeetingCard from "./meetingCard";
import TimeCard from "./timeCard"


class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.callback = this.callback.bind(this);

    this.state = {
      cardSelected: "default",
      userId: ""
    }
  }

  handleClick(input) {
    this.setState({
      cardSelected: input
    })
  }

  callback(id) {
    this.setState({
        userId: id
    })
  }

  render() {
    return (<div>
      <div className="buttonGroups">
        <Row>
          <Col sm={3}>
            <button className="generalButton foodButton" onClick={(e) => this.handleClick("food", e)}>Food</button>
          </Col>
          <Col sm={3}>
            <button className="generalButton" onClick={(e) => this.handleClick("meeting", e)}>Meeting</button>
          </Col>
          <Col sm={3}>
            <button className="generalButton" onClick={(e) => this.handleClick("movie", e)}>Movie</button>
          </Col>
          <Col sm={3}>
            <button className="generalButton" onClick={(e) => this.handleClick("time", e)}>Time</button>
          </Col>
        </Row>
      </div>
      {this.renderCard()}
    </div>)
  }

  renderCard() {
          if (this.state.cardSelected === "food") {
              return (<div><FoodCard cb={this.callback}/></div>)
          } else if (this.state.cardSelected === "movie") {
              return (<div><MovieCard cb={this.callback}/></div>)
          } else if (this.state.cardSelected === "meeting") {
              return (<div><MeetingCard cb={this.callback}/></div>)
          } else if (this.state.cardSelected === "time") {
              return (<div><TimeCard cb={this.callback}/></div>)
          }
          return (<div><FoodCard cb={this.callback}/></div>)
      }
}

export default MainPage;