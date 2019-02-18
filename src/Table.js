import React, { Component } from 'react';

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Time</th>
                <th>Description</th>
                <th>Current Vote</th>
                <th></th>
            </tr>
        </thead>
    );
}

const TableBody = props => {
    const rows = props.detailsData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.time}</td>
                <td>{row.description}</td>
                <td>{row.currentVote}</td>
                <td><button onClick={() => props.updateCounter(index)}>Vote</button></td>
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
}

class Table extends Component {
    render() {
        const { detailsData, updateCounter } = this.props;

        return (
            <table>
                <TableHeader />
                <TableBody detailsData={detailsData} updateCounter={updateCounter} />
            </table>
        );
    }
}

export default Table;
