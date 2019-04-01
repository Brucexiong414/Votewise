import React, {Component} from "react";
import "./isLoading.css"

class IsLoading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="isLoadingAll">
      <div className="loadingSnippet">
      </div>
      <p>isLoading</p>
    </div>)
  }
}

export default IsLoading;