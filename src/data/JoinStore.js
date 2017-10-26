import /*mobx,*/ { observable, computed, action, useStrict } from "mobx";
import socket from './SocketHandler';

useStrict(true);

class JoinStore {
    @observable title = "";
    @observable num = 1;
    @observable positive = "";
    @observable negative = "";
    @observable checkbox = false;
    @observable general = "";
    @observable joinCode = "";

    @observable feedback = {
        type: 'feedback',
        data: []
    }
    @observable participants = observable([]);

    constructor() {
        window.joinStore = this;
    }

    @action onMessage = (data) => {
        switch (data.type) {
            case 'config':
                console.log('received config');
                this.configure(data);
                break;
            default:
                console.log(data);
                break;
        }
    }

    @action configure = (data) => {
        this.title = data.title;
        this.num = data.amount;
        this.positive = data.positive;
        this.negative = data.negative;
        this.checkbox = data.general ? true : false;
        this.general = data.general;

        this.generateFeedback('p', 'positive');
        this.generateFeedback('n', 'negative');
        if (this.checkbox) {
            let generalFB = {
                id: 'general',
                type: 'general',
                value: '',
            };
            console.log(generalFB);
            this.feedback.data.push(generalFB);
        }
    }

    @action generateFeedback = (baseid, type) => {
        for (let i = 0; i < this.num; i++) {
            let id = `${baseid}-${i}`;
            let fb = {
                id: id,
                type: type,
                value: '',
            };
            console.log(fb);
            this.feedback.data.push(fb);
        }
    }

    @computed get getEvaluation() {
        return this.evaluation;
    }

    @computed get data() {
        return this.feedback.data;
    }

    @action setFeedback = (e) => {
        let fb = this.feedback;
        let data = fb.data[e.target.id];
        if (data) {
            data.val = e.target.value;
            this.feedback = fb;
        }
    }

    @action setCode = (code) => {
        this.joinCode = code;
    }

    joinHost = () => {
        socket.subscribe(this.onMessage);
        let join = {
            type: 'join',
            code: this.joinCode,
        }
        socket.send(join);
    }

}

export default new JoinStore();
