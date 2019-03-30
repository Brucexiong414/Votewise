import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';
import "./Details.css";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: []
    }
  }

  updateCounter = index => {
    const {details} = this.state;

    details[index].currentVote = details[index].currentVote + 1;
    // sort by current vote
    details.sort((a, b) => b.currentVote - a.currentVote)

    this.setState({
      details: details
    });

  }


  handleSubmit = details => {
    console.log(details.name);
 
    this.setState({details: [...this.state.details, details]});
  }

  render() {
    const {details} = this.state;

    return (
      <div className="container">
        <h1 className="eventName">{this.props.location.state.title}</h1>
        <p className="eventTitle">{this.props.location.state.eventTitle}</p>
        <p>Please create or vote for your favorite options!</p>
        <Table
          detailsData={details}
          updateCounter={this.updateCounter}
        />
        <h3>Add New</h3>
        <Form handleSubmit={this.handleSubmit}
              eventTitle={this.props.location.state.eventTitle} />
      </div>
    );
  }
}

export default Details;
