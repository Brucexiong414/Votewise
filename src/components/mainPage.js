import React, {Component} from "react"
import {Row, Col} from "react-bootstrap"
import FoodCard from "./FoodCard";
import MovieCard from "./MovieCard";
import "./mainPage.css"
import MeetingCard from "./meetingCard";
import TimeCard from "./timeCard"
import { API } from "aws-amplify";


class MainPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      cardSelected: "default",
      userId: ""
    }
  }

 async handleClick(input) {
     try {
         let r = await this.createEvent({
             event: "a",
           //  categories: "food"
         });

         this.setState({
             userId: r.userId
         });
         console.log(this.state.userId);
     } catch (e) {
         alert(e);
     }

    this.setState({
      cardSelected: input
    })
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
              return (<div><FoodCard id={this.state.userId} /></div>)
          } else if (this.state.cardSelected === "movie") {
              return (<div><MovieCard id={this.state.userId} /></div>)
          } else if (this.state.cardSelected === "meeting") {
              return (<div><MeetingCard id={this.state.userId}/></div>)
          } else if (this.state.cardSelected === "time") {
              return (<div><TimeCard id={this.state.userId}/></div>)
          }
          return (<div><FoodCard id={this.state.userId}/></div>)
      }
}

export default MainPage;
