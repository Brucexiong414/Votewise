import React, { Component } from "react";
import { API } from "aws-amplify";
import "./CardStyle.css"

export default class History extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            isLoading: true
        };
    }

    async componentDidMount() {
        console.log(this.props.location.state.userId);
        try {
            const votes = await this.votes();

            let items = [];
            for (let i = 0; i < votes.length; i++) {
                if (votes[i].userId === this.props.location.state.userId &&
                     votes[i].event.includes("-")) {
                    items.push(votes[i].event.replace(/-/g, ' '));
                }
            }

            this.setState({
                list: items,
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

    render() {
        return (
            <div>
            <h1>
                My History vote
            </h1>
                {this.state.isLoading ? <div>is Loading...</div> :
                    <ul className = "VoteList">
                        {this.renderItems()}
                    </ul>
                }
            </div>
        );
    }

    renderItems() {
        let items = [];
        for (let i = 0; i < this.state.list.length; i++) {
            items.push(<li key={i} className = "listItemVote2">{this.state.list[i]}</li>);
        }
        return (<div>{items}</div>)
    }
}
