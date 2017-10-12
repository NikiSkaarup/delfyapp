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
        data: []
    }
    @observable participants = [];

    @action onMessage(data) {
        switch (data.type) {
            case 'config':
                this.title = data.title;
                this.num = data.amount;
                this.positive = data.positive;
                this.negative = data.negative;
                this.checkbox = data.general ? true : false;
                this.general = data.general;
                this.joinCode = data.joinCode;
                break;
            default:
                console.log(data);
                break;
        }
    }

    @computed get getMessages() {
        return this.messages.filter(() => true);
    }

    @computed get getEvaluation() {
        return this.evaluation;
    }

    @action setCode(joinCode) {
        this.joinCode = joinCode;
    }

    @action setPositive(positive) {
        this.positive = positive;
    }

    @action setNegative(negative) {
        this.negative = negative;
    }

    @action setGeneral(general) {
        this.general = general;
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
