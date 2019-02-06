import React, {Component} from "react"
import FoodCard from "./FoodCard";
import MovieCard from "./MovieCard";
import "./mainPage.css"
import MeetingCard from "./meetingCard";
import TimeCard from "./timeCard"


class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      cardSelected: "default"
    }
  }

  handleClick(input) {
    this.setState({
      cardSelected: input
    })
  }

  render() {
    return (<div>
      <div className="buttonGroups">
        <button className="generalButton foodButton" onClick={(e) => this.handleClick("food", e)}>Food</button>
        <button className="generalButton" onClick={(e) => this.handleClick("meeting", e)}>Meeting</button>
        <button className="generalButton" onClick={(e) => this.handleClick("movie", e)}>Movie</button>
        <button className="generalButton" onClick={(e) => this.handleClick("time", e)}>Time</button>
      </div>
      {this.renderCard()}
    </div>)
  }

  renderCard() {
    if (this.state.cardSelected === "food") {
      return (<div><FoodCard/></div>)
    } else if (this.state.cardSelected === "movie") {
      return (<div><MovieCard/></div>)
    } else if (this.state.cardSelected === "meeting") {
      return (<div><MeetingCard/></div>)
    } else if (this.state.cardSelected === "time") {
      return (<div><TimeCard/></div>)
    }
    return <p>Empty Content</p>

  }
}

export default MainPage;