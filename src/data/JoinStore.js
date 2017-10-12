import /*mobx,*/ { observable, computed, action, useStrict } from "mobx";
import socket from './SocketHandler';

useStrict(true);

class JoinStore {
    @observable title = "";
    @observable num = 3;
    @observable positive = "";
    @observable negative = "";
    @observable checkbox = false;
    @observable general = "";
    @observable joinCode = "";

    @observable feedback = {
        type: 'feedback',
        data: []
    }
    @observable participants = [];

    @action onMessage = (data) => {
        switch (data.type) {
            case 'config':
                this.title = data.title;
                this.num = data.amount;
                this.setPositive = data.positive;
                this.negative = data.negative;
                this.checkbox = data.general ? true : false;
                this.general = data.general;
                break;
            default:
                console.log(data);
                break;
        }
    }

    @computed get getEvaluation() {
        return this.evaluation;
    }

    @action addFeedback = (data) => {
        this.feedback.data.push(data);
    }

    @action setFeedback = (e) => {
        let fb = this.feedback;
        let data = fb.data.find((fb) => fb.id === e.target.id);
        if (data) {
            data.value = e.target.value;
        }
        this.feedback = fb;
    }

    @action setCode = (code) => {
        this.joinCode = code;
    }

    joinHost() {
        socket.subscribe(this.onMessage);
        let join = {
            type: 'join',
            code: this.joinCode,
        }
        socket.send(join);
    }

}

export default new JoinStore();
