import React, { Component } from 'react';
import { API } from "aws-amplify";

const TableHeader = () => {
    return (
        <thead>
            <tr className="dtr">
                <th className="dth">Name</th>
                <th className="dth">Time</th>
                <th className="dth">Description</th>
                <th className="dth">Current Vote</th>
                <th className="dth"></th>
            </tr>
        </thead>
    );
}

class TableBody extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick(name, time, description, currentVote, index, e) {
        e.preventDefault();

        // check if the user have voted before
        try {
            const votes = await this.votes();
          //  console.log(this.props.id);
            for (let i = 0; i < votes.length; i++) {
                if (votes[i].userId === this.props.id &&
                    votes[i].event === this.props.eventTitle + "+") {
                    console.log('get here')
                    alert('You have voted for this event')
                    return;
                }
            }
        } catch (e) {
            alert(e);
        }

        // else if user haven't vote for this event

        let items = [];

        try {
            // when user click the vote button
            // they will be alerted if they already voted. Limit is 1 vote per person
            const votes = await this.votes();

            for (let i = 0; i < votes.length; i++) {  // query from data base to list all events
                if (votes[i].event === this.props.eventTitle
                    && votes[i].choices) {

                    let a = votes[i].choices;

                    // items.push(votes[i].choices.map(option => option));
                    for (let j = 0; j < a.length; j++) {
                        if (a[j].name === name) {
                            a[j].currentVote++;
                        }
                        items.push(a[j]);
                    }
                }
            }

        } catch (e) {
            alert(e);
        }

        try {
            await this.createEvent({
                event: this.props.eventTitle,
                category: this.props.category.toLowerCase(),
                choices: items
            });
        } catch (e) {
           // console.log(items)
            alert(e);
        }

        try {
            await this.createEvent({
                event: this.props.eventTitle + '+',
            });
        } catch (e) {
            // console.log(items)
            alert(e);
        }

        this.props.updateCounter(index);
    }

    createEvent(vote) {
        let v = API.post("votes", "/votes", {
            body: vote
        });
        return v;
    }

    votes() {
        let v = API.get("votes", "/votes");
        return v;
    }

    render() {
            const rows = this.props.detailsData.map((row, index) =>
                <tr className="dtr" key={index}>
                    <td className="dtd">{row.name}</td>
                    <td className="dtd">{row.time}</td>
                    <td className="dtd">{row.description}</td>
                    <td className="dtd">{row.currentVote}</td>
                    <td className="dtd">
                        <button className="dButton"
                                onClick={(e) => this.handleClick(row.name, row.time,
                                    row.description, row.currentVote, index, e)}>
                            Vote
                        </button>
                    </td>
                </tr>
            );
            return <tbody>{rows}</tbody>;
        }

}

class Table extends Component {

    render() {
        const { detailsData, updateCounter, eventTitle, category, id} = this.props;

        return (
            <table className="dTable">
                <TableHeader />

                <TableBody detailsData={detailsData}
                           updateCounter={updateCounter}
                           eventTitle={eventTitle}
                           category={category}
                           id={id}/>
            </table>
        );
    }
}

export default Table;
