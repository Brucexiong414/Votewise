import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';

class App extends Component {
    state = {
        characters: []
    };

    removeCharacter = index => {
        const { characters } = this.state;

        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index;
            })
        });
    }

    updateCounter = index => {
      const { currentVote } = this.state.currentVote;

      this.setState({currentVote: currentVote + 1});
    }

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
    }

    render() {
        const { characters } = this.state;

        return (
            <div className="container">
                <h1>Details Page</h1>
                <p>Please create or vote for your favorite options!</p>
                <Table
                    characterData={characters}
                    removeCharacter={this.removeCharacter}
                />
                <h3>Add New</h3>
                <Form handleSubmit={this.handleSubmit} />
            </div>
        );
    }
}

export default App;
