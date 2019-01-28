import React, {Component} from "react";
import "./App.css";
import Navigation from "./components/navigation";
import Carousel from "./components/Carousel"


class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Navigation/>
        <div className="carouselElement">
          <Carousel/>
        </div>
      </div>
    );
  }
}

export default App;
