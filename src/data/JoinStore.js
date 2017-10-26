import /*mobx,*/ { observable, computed, action, useStrict, toJS } from 'mobx';
import socket from './SocketHandler';

useStrict(true);

/**
 * handles participants side of things
 * everything from joining to voting.
 */
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
        // set participants to 0 so we don't temporarily have an empty array of 1000 elements.
        this.participants.length = 0;
    }

    /**
     * function used for subscribing to the SocketHandler
     */
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

    /**
     * after joining using a join code
     * configure the client based on the
     * host setup config
     */
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
                val: '',
            };
            this.feedback.data.push(generalFB);
        }
    }

    /**
     * generate feedback data placeholders
     * based on the required number
     */
    @action generateFeedback = (baseid, type) => {
        for (let i = 0; i < this.num; i++) {
            let id = `${baseid}-${i}`;
            let fb = {
                id: id,
                type: type,
                val: '',
            };
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
        let data = fb.data.find(el => el.id === e.target.id);
        if (data) {
            data.val = e.target.value;
            this.feedback = fb;
        }
    }

    @action setCode = (code) => {
        this.joinCode = code;
    }

    /**
     * subscribe to the SocketHandler and
     * send join message along with join code
     * if not subscribing before joining
     * join reply might be lost
     */
    joinHost = () => {
        socket.subscribe(this.onMessage);
        let join = {
            type: 'join',
            code: this.joinCode,
        }
        socket.send(join);
    }

    /**
     * send feedback to server, so it
     * can pass on the data for the host
     */
    submitFeedback = () => {
        console.log(toJS(this.feedback));
        socket.send(toJS(this.feedback));
    }

}

export default new JoinStore();
