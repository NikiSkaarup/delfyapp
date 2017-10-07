import React, { Component } from 'react';
import createHistory from 'history/createHashHistory';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import InputGroup from '../InputGroup';

const history = createHistory();

@inject('JoinStore')
@observer
class Join extends Component {
    changeCode = e => this.props.joinStore.setCode(e.target.value);
    
    joinEvaluation = (event) => {
        event.preventDefault();
        this.props.createStore.generateCode();
        //CreateStore.updateEvaluation(this.state.evaluation);
        history.push('/monitor');
        console.log(this.props.createStore);
    }

    render() {
        const {
            joinCode
        } = this.props.joinStore;

        return (
            <form className="home">
                <h1 className="title">Join evaluation</h1>
                <p className="subtitle">Enter the code here to join.</p>

                <InputGroup id="joinCode"
                    type="text"
                    title="joinCode"
                    onChange={this.changeCode}
                    value={joinCode} />

                <button type="submit" onClick={this.joinEvaluation}>Join</button>
            </form>
        );
    }
}

export default Join;
