import React, { Component } from 'react';

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

const TableBody = props => {
    const rows = props.detailsData.map((row, index) => {
        return (
            <tr className="dtr" key={index}>
                <td className="dtd">{row.name}</td>
                <td className="dtd">{row.time}</td>
                <td className="dtd">{row.description}</td>
                <td className="dtd">{row.currentVote}</td>
                <td className="dtd"><button className="dButton" onClick={() => props.updateCounter(index)}>Vote</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class Table extends Component {
    render() {
        const { detailsData, updateCounter } = this.props;

        return (
            <table className="dTable">
                <TableHeader />
                <TableBody detailsData={detailsData} updateCounter={updateCounter} />
            </table>
        );
    }
}

export default Table;
