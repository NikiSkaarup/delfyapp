
import /*mobx,*/ { observable, computed, action, useStrict, toJS } from "mobx";
import socket from './SocketHandler';

useStrict(true);

/**
 * handles everything to do with hosting
 * a new evaluation from creation to viewing results
 */
class CreateStore {
  @observable title = "";
  @observable num = 3;
  @observable positive = "";
  @observable negative = "";
  @observable checkbox = false;
  @observable general = "";
  @observable joinCode = "";

  @observable feedback = observable([]);
  @observable participants = observable([]);

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

  /**
   * function used for subscribing to the SocketHandler
   */
  @action onMessage = (message) => {
    console.log(message);
    switch (message.type) {
      case 'config':
        this.setJoinCode(message.code);
        break;
      case 'update':
        this.participants = message.data;
        break;
      case 'feedback':
        this.feedback.push(message.data);

        socket.send({
          type: 'feedback',
          data: toJS(this.feedback)
        });
        break;
      default:
        console.log(message);
        break;
    }
  }

  /**
   * subsribes to the SocketHandler
   * sets up the configuration and
   * sends it across to the server
   * so it can shared the config with clients
   */
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
