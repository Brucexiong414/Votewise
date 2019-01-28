import React, {Component} from "react";
import "./Carousel.css"
import "./FoodCard"
import "./MovieCard"
import FoodCard from "./FoodCard";
import MovieCard from "./MovieCard";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToPrevSlide = this.goToPrevSlide.bind(this);
    this.goToNextSlide = this.goToNextSlide.bind(this);

    this.state = {
      activeIndex: 0
    };
  }

  goToPrevSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;

    if (index === 0) {
      index = 1;
    } else {
      --index;
    }
    this.setState({
      activeIndex: index
    });
  }

  goToNextSlide(e) {
    e.preventDefault();

    let index = this.state.activeIndex;

    if (index === 1) {
      index = 0;
    } else {
      ++index;
    }
    this.setState({
      activeIndex: index
    });
  }

  render() {
    console.log(this.state.activeIndex);
    return (
      <div>
        <a href="#" className="previous round" onClick={this.goToPrevSlide}>
          <div className="previousArrow">
            &#8249;
          </div>
        </a>
        {this.renderEachCard()}
        <a href="#" className="next round" onClick={this.goToNextSlide}>
          <div className="nextArrow">
            &#8250;
          </div>
        </a>
      </div>
    )
  }

  renderEachCard(){
    if(this.state.activeIndex === 0){
      return(
        <div className="cardItem">
          <FoodCard/>
        </div>
        )
    }else{
      return(
        <div className="cardItem">
          <MovieCard/>
        </div>
      )
    }
  }
}

export default Carousel;