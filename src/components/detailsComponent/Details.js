import React, {Component} from 'react';
import Table from './Table';
import Form from './Form';
import "./Details.css";
import { API } from "aws-amplify";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      isLoading: true
    }
  }

    async componentDidMount() {

        try {
            const votes = await this.votes();

            let items = [];
            for (let i = 0; i < votes.length; i++) {  // query from data base to list all events
                if (votes[i].event === this.props.location.state.eventTitle
                && votes[i].choices) {

                    let a = votes[i].choices;

                    // items.push(votes[i].choices.map(option => option));
                    for (let j = 0; j < a.length; j++) {
                        items.push(a[j]);
                    }
                }
            }

            console.log(items)
            this.setState({
                details: items,
                isLoading: false
            });
        } catch (e) {
            alert(e);
        }
    }

    votes() {
        let v = API.get("votes", "/votes");
        return v;
    }

  updateCounter = index => {
    const {details, isLoading} = this.state;

    details[index].currentVote = details[index].currentVote + 1;
    // sort by current vote
    details.sort((a, b) => b.currentVote - a.currentVote)

    this.setState({
      details: details
    });

  }


  handleSubmit = details => {
    console.log(details);

    this.setState({details: [...this.state.details, details]});
  }

  render() {
    const {details} = this.state;

    return (
        this.state.isLoading ?
            <div>isLoading...</div> :
      <div className="container">
        <h1 className="eventName">{this.props.location.state.title}</h1>
        <p className="eventTitle">{this.props.location.state.eventTitle}</p>
        <p>Please create or vote for your favorite options!</p>

           <Table
              detailsData={this.state.details}
              updateCounter={this.updateCounter}
              eventTitle={this.props.location.state.eventTitle}
              category={this.props.location.state.title}
          />
        <h3>Add New</h3>
        <Form handleSubmit={this.handleSubmit}
              eventTitle={this.props.location.state.eventTitle}
              category={this.props.location.state.title}/>
      </div>
    );
  }
}

export default Details;
