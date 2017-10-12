
import /*mobx,*/ { observable, computed, action, useStrict } from "mobx";
import socket from './SocketHandler';

useStrict(true);

class CreateStore {
  @observable title = "";
  @observable num = 3;
  @observable positive = "";
  @observable negative = "";
  @observable checkbox = false;
  @observable general = ""; or
  @observable joinCode = "";

  @observable feedback = [];
  @observable participants = [];

  @computed get getEvaluation() {
    return this.evaluation;
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setNum(num) {
    let numInteger = Number.parseInt(num, 10);
    if (Number.isInteger(numInteger) && numInteger >= 0) this.num = numInteger;
  }

  @action setPositive(positive) {
    this.positive = positive;
  }

  @action setNegative(negative) {
    this.negative = negative;
  }

  @action setCheckbox(checkbox) {
    this.checkbox = checkbox;
  }

  @action setGeneral(general) {
    this.general = general;
  }

  @action setJoinCode(data) {
    this.joinCode = data;
  }

  @action onMessage = (data) => {
    console.log(data);
    switch (data.type) {
      case 'config':
        this.setJoinCode(data.code);
        break;
      default:
        console.log(data);
        break;
    }
  }

  @action startHosting = () => {
    console.log('startHosting');
    socket.subscribe(this.onMessage);

    let host = {
      type: 'host',
      title: this.title,
      positive: this.positive,
      negative: this.negative,
      amount: this.num,
    }

    if (this.checkbox) {
      host.general = this.general;
    }

    socket.send(host);
  }
}

export default new CreateStore();
