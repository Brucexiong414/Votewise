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

        try {
            await this.createEvent({
                event: this.props.eventTitle,
                category: this.props.category.toLowerCase(),
                choices: {
                    "name": name,
                    "time": time,
                    "description": description,
                    "currentVote": currentVote + 1
                }
            });
        } catch (e) {
            alert(e);
        }

        this.props.updateCounter(index);
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
