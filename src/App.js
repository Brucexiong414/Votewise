import React, {Component} from "react";
import "./App.css";
import Navigation from "./components/navigation";
import ControlledCarousel from "./components/newCarousel";


class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Navigation/>
        <div className="carouselElement">
          <ControlledCarousel/>
          <div/>
        </div>
      </div>
    );
  }
}
export default App;
