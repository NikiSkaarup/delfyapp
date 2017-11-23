import /*mobx,*/ { observable, action, useStrict, toJS } from 'mobx';
import socket from './SocketHandler';
import Cookies from 'universal-cookie';
import { setInterval } from 'core-js/library/web/timers';

useStrict(true);
const cookies = new Cookies();

/**
 * handles participants side of things
 * everything from joining to voting.
 */
class JoinStore {
    @observable title = "";
    @observable num = 1;
    @observable positive = "";
    @observable negative = "";
    @observable general = "";
    @observable joinCode = "";

    @observable myFeedback = {
        type: 'feedback',
        data: {
            positive: [],
            negative: [],
            general: []
        }
    };

    @observable allFeedback = {
        type: 'feedback',
        data: {
            positive: [],
            negative: [],
            general: []
        }
    };

    determinedFeedback = {
        positive: [],
        negative: [],
        general: []
    };

    @observable voting = {
        type: 'voting',
        data: {
            positive: [],
            negative: [],
            general: []
        }
    };
    @observable participants = [];

    @observable feedbackDone = false;
    doneCheckInterval = 0;

    constructor() {
        window.joinStore = this;
        // set participants to 0 so we don't temporarily have an empty array of 1000 elements.
        this.participants.length = 0;
        this.doneCheckInterval = setInterval(this.checkVotingDone, 1000);
    }

    checkVotingDone = () => {
        // return if NOT done receiving feedback
        if (!this.feedbackDone) return;
        // return if NOT done voting!
        if (this.allFeedback.data.positive.length
            !== this.determinedFeedback.positive.length) return;
        if (this.allFeedback.data.negative.length
            !== this.determinedFeedback.negative.length) return;
        if (this.allFeedback.data.general.length
            !== this.determinedFeedback.general.length) return;
        // do something now.
        socket.send(this.voting);
        clearInterval(this.checkVotingDone);
    };

    /**
     * function used for subscribing to the SocketHandler
     */
    @action onMessage = (data) => {
        switch (data.type) {
            case 'config':
                console.log('received config');
                this.configure(data);
                break;
            case 'feedback':
                this.feedbackHandler(data);
                break;
            case 'feedback_done':
                this.feedbackDone = data.data;
                break;
            default:
                console.log(data);
                break;
        }
    }

    feedbackHandler = (data) => {
        console.log(data);
        let temp = {};
        temp.positive = data.positive.map(item => {
            const determined = this.determinedFeedback[item.type].find(id => id === item.id);
            return { ...item, determined };
        });
        temp.negative = data.negative.map(item => {
            const determined = this.determinedFeedback[item.type].find(id => id === item.id);
            return { ...item, determined };
        });
        temp.general = data.general.map(item => {
            const determined = this.determinedFeedback[item.type].find(id => id === item.id);
            return { ...item, determined };
        });
        this.allFeedback.data = temp;
    }

    /**
     * after joining using a join code
     * configure the client based on the
     * host setup config
     */
    configure = (data) => {
        this.title = data.title;
        this.num = data.amount;
        this.positive = data.positive;
        this.negative = data.negative;
        this.general = data.general;

        this.userId = data.userId;
        cookies.set('userId', data.userId);

        this.generateFeedback('p', 'positive');
        this.generateFeedback('n', 'negative');
        if (this.general) {
            let generalFB = {
                id: 'general',
                type: 'general',
                val: '',
            };
            this.myFeedback.data[generalFB.type].push(generalFB);
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
            this.myFeedback.data[type].push(fb);
        }
    }

    setDetermined = (item) => {
        item.determined = true;
        this.determinedFeedback[item.type].push(item.id);
    };

    @action dismissFeedback = (id, type) => {
        let item = this.allFeedback.data[type].find(it => it.id === id);
        this.setDetermined(item);
    };

    @action approveFeedback = (id, type) => {
        let item = this.allFeedback.data[type].find(it => it.id === id);
        this.voting.data[type].push({ id, userId: this.userId });
        this.setDetermined(item);
    };

    @action setFeedback = (e) => {
        let fb = this.myFeedback;
        let data = fb.data[e.target.getAttribute('data-type')]
            .find(el => el.id === e.target.id);

        if (data) {
            data.val = e.target.value;
            this.myFeedback = fb;
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
        let userId = cookies.get('userId');
        if (userId !== undefined) join.userId = userId;
        socket.send(join);
    }

    /**
     * send feedback to server, so it
     * can pass on the data for the host
     */
    submitFeedback = () => {
        console.log(toJS(this.myFeedback));
        socket.send(toJS(this.myFeedback));
    }

}

export default new JoinStore();
