import React, {Component} from "react";
import MovieLink from "../pictures/movie.jpg"

class MovieCard extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className = "movieName">
        <img src = {MovieLink} width = "500" height = "300"/>
      </div>
    )
  }
}

export default MovieCard;