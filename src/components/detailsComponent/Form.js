import React, {Component} from 'react';
import { API } from "aws-amplify";

class Form extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            name: '',
            time: '',
            description: '',
            currentVote: 1
        };

        this.state = this.initialState;
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }

    onFormSubmit = async event => {
        event.preventDefault();

        let timeRegex = /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/;

        if (!timeRegex.test(this.state.time)) {
            alert('Please use 24h time system in a format HH:MM');
            this.setState({
                name: '',
                time: '',
                description: '',
                currentVote: 1
            });

            return;
        }

        try {
            await this.createEvent({
                event: this.props.eventTitle,
                choices: {
                    "name": this.state.name,
                    "time": this.state.time,
                    "description": this.state.description,
                    "currentVote": this.state.currentVote
                }
            });
        } catch (e) {
            alert(e);
        }

        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    createEvent(vote) {
        let v = API.post("votes", "/votes", {
            body: vote
        });
        v.then(result => {
          console.log(result);
        })
        return v;
    }

    render() {
        const { name, time, description, currentVote} = this.state;

        return (
            <form onSubmit={this.onFormSubmit}>
                <label className="dLabel">Name</label>
                <input className= "inputItem"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange} />
                <label className="dLabel">Time</label>
                <input
                    type="text"
                    name="time"
                    value={time}
                    onChange={this.handleChange} />
                <label className="dLabel">Description</label>
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.handleChange} />
                <button className="dButton" type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;
