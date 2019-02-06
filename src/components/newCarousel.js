import React, {Component} from "react"
import {Carousel} from 'react-bootstrap';
import FoodCard from "./FoodCard";
import MovieCard from "./MovieCard";
import MeetingCard from "./meetingCard";
import TimeCard from "./timeCard"
import "./newCarousel.css";

class ControlledCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleSelect = this.handleSelect.bind(this);

    this.state = {
      index: 0,
      direction: null,
    };
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  }

  render() {
    const {index, direction} = this.state;

    return (
      <div className="newCarouselContainer">
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
        >
          <Carousel.Item>
            <Carousel.Caption>
              <div className="foodWord">
                <h2>Food</h2>
              </div>
            </Carousel.Caption>
            <FoodCard/>
          </Carousel.Item>
          <Carousel.Item>
            <Carousel.Caption>
              <div className = "movieWord">
                <h2>Movie</h2>
              </div>
            </Carousel.Caption>
            <MovieCard/>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default ControlledCarousel;