import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import '../../css/Home.css';
import '../../css/Voting.css';
import '../../css/Tables.css';

@inject('createStore')
@observer
class Results extends Component {

    renderResultContainer = (title, d) => {
        console.log(toJS(d));
        let temp = [];

        for (let i = 0; i < d.length; i++) {
            const item = d[i];
            if (item.determined !== undefined) continue;
            temp.push(
                <tr key={i}>
                    <td>{item.val}</td>
                    <td>{item.votes && item.votes.length}{!item.votes && 0}</td>
                </tr>
            );
        }
        console.log(toJS(temp));

        return (
            <table className="resultTable">
                <thead>
                    <tr>
                        <th>{title}</th>
                        <th>Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {temp}
                </tbody>
            </table>
        );
    }

    render() {
        const {
            title,
            positive,
            negative,
            general,
            results,
            store,
        } = this.props.createStore;
        return (
            <div className="home">
                <h1 className="title">{title}</h1>
                <h2 className="title q">Voting results</h2>
                <button onClick={store} >Store Results</button>
                {this.renderResultContainer(positive, results.positive)}
                {this.renderResultContainer(negative, results.negative)}
                {general && this.renderResultContainer(general, results.general)}
            </div>
        );
    }
}

export default Results;
