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

        let items = [];

        try {
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
        const { detailsData, updateCounter, eventTitle, category} = this.props;

        return (
            <table className="dTable">
                <TableHeader />

                <TableBody detailsData={detailsData}
                           updateCounter={updateCounter}
                           eventTitle={eventTitle}
                           category={category}/>
            </table>
        );
    }
}

export default Table;
