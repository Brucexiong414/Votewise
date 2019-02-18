import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import "./Details.css";
import "./detailsPage.css";

class Details extends Component {
    state = {
        details: [{name: "Satay", time: "7:30pm", description: "Thai food", currentVote: 4}
        , {name: "Rand", time: "7:00pm", description: "Bowls @Chef James Bistro", currentVote: 2}]
    };

    updateCounter = index => {
      const { details } = this.state;

      // console.log(characters);

      console.log(details[index]);
      details[index].currentVote = details[index].currentVote + 1;
      console.log(details[index]);

      this.setState({
          details: details
      });
    }


    handleSubmit = details => {
        this.setState({details: [...this.state.details, details]});
    }

    render() {
        const { details } = this.state;

        return (
            <div className="container">
                  <h1 className="eventName">Tonight's Dinner</h1>
                <p>Please create or vote for your favorite options!</p>
                <Table
                    detailsData={details}
                    updateCounter={this.updateCounter}
                />
                <h3>Add New</h3>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default Details;
