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
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange} />
                <label>Time</label>
                <input
                    type="text"
                    name="time"
                    value={time}
                    onChange={this.handleChange} />
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.handleChange} />
                <button type="submit">
                    Submit
                </button>
            </form>
        );
    }
}

export default Form;
