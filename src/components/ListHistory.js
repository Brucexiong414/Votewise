import React, { Component } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import { API } from "aws-amplify";

export default class His extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            votes: []
        };
    }

    async componentDidMount() {
        // if (!this.props.isAuthenticated) {
        //     return;
        // }

        try {
            const votes = await this.votes();
            this.setState({ votes });
        } catch (e) {
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    votes() {
        return API.get("votes", "/votes");   // now have length alert
    }

    renderNotesList(votes) {
        let items = [];
        for (let i = 0; i < votes.length; i++) {
            items.push(<li>{votes[i].content}</li>)
        }
        return (<div>{items}</div>);
    }

    renderNotes() {
        return (
            <div>
                <PageHeader>Your Past Votes</PageHeader>
                <ListGroup>
                    {!this.state.isLoading && this.renderNotesList(this.state.votes)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div>
                <ul>
                {this.renderNotes()}
                </ul>
            </div>
        );
    }
}