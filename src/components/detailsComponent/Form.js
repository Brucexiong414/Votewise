import React, {Component} from 'react';

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

    onFormSubmit = (event) => {
        event.preventDefault();

        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
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
