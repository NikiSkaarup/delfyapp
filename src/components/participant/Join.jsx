import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import '../../css/Home.css';
import '../../css/PurdyBox.css';
import InputGroup from '../InputGroup';

@inject('joinStore')
@observer
class Join extends Component {

    /**
     * updates the `join code` in the store
     */
    changeCode = e => this.props.joinStore.setCode(e.target.value);

    /**
     * joins host and transfers user to new page
     */
    joinEvaluation = (event) => {
        event.preventDefault();
        //this.props.createStore.generateCode();
        //CreateStore.updateEvaluation(this.state.evaluation);
        console.log(this.props.joinStore);
        this.props.joinStore.joinHost();
        this.props.history.push('/feedback');
    }

    render() {
        const {
            joinCode
        } = this.props.joinStore;

        return (
            <form className="home">
                <h1 className="title">Join evaluation</h1>
                <p className="subtitle">Enter the code here to join.</p>

                <div className="purdy_box">
                    <InputGroup id="joinCode"
                        type="text"
                        title="joinCode"
                        onChange={this.changeCode}
                        value={joinCode} />

                    <button type="submit" onClick={this.joinEvaluation}>Join</button>
                </div>
            </form>
        );
    }
}

export default Join;
