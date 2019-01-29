import React, {Component} from "react";
import Foodlink from "../pictures/food.jpeg";
import "./FoodCard.css"

class FoodCard extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className = "foodImage">
        <img src = {Foodlink} width = "500" height = "300"/>
      </div>
    )
  }
}

export default FoodCard;