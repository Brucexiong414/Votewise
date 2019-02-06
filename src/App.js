import React, {Component} from "react";
import "./App.css";
import Navigation from "./components/navigation";
import MainPage from "./components/mainPage";


class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Navigation/>
        <div>
          <MainPage/>
        </div>
      </div>
    );
  }
}

export default App;
