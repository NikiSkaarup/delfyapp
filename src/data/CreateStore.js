
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

  @observable feedbackDone = false;
  @observable feedbackRecieved = 0;
  @observable feedback = {
    type: 'feedback',
    positive: [],
    negative: [],
    general: []
  }
  @observable participants = [];


  @observable votesRecieved = 0;
  @observable results = {
    type: 'results',
    positive: [],
    negative: [],
    general: []
  }

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
        this.feedbackHandler(message);
        break;
      case 'voting':
        this.votingHandler(message);
        break;
      default:
        console.log(message);
        break;
    }
  }



  /**
   * expected data format received
   * {
   *  type: 'voting',
   *  data: {
   *    positive: [{id, userId}],
   *    negative: [{id, userId}],
   *    general: [{id, userId}]
   *  }
   * }
   */
  votingHandler = (message) => {
    message.data.positive.forEach((item) => this.findAndAssignVote(this.results.positive, item));
    message.data.negative.forEach((item) => this.findAndAssignVote(this.results.negative, item));
    message.data.general.forEach((item) => this.findAndAssignVote(this.results.general, item));
    this.votesRecieved++;
    if (this.votesRecieved === this.feedbackRecieved && this.feedbackDone) {
      console.log('dune!');// TODO: figure out what to do next.
    }
  }

  /**
   *
   * if this is super slow change to use key value rather than arrays
   * for both the array and fb.votes rather than nested arrays have
   * nested key value stores aka objects.
   * 
   * @param {[]} arr
   * @param {{id, userId}} vote 
   */
  findAndAssignVote(arr, vote) {
    arr.forEach((fb) => {
      if (fb.id === vote.id) {
        if (fb.votes === undefined) fb.votes = [];
        const res = fb.votes.find((userId) => userId === vote.userId);
        if (res === undefined) fb.votes.push(vote.userId);
      }
    });
  }

  feedbackHandler = (message) => {
    this.feedback.positive.push(...message.data.positive);
    this.feedback.negative.push(...message.data.negative);
    if (this.checkbox)
      this.feedback.general.push(...message.data.general);
    socket.send(toJS(this.feedback));
    this.feedbackRecieved++;
    if (!this.feedbackDone && this.feedbackRecieved === this.participants.length && this.participants.length > 5) {
      this.feedbackDone = true;
      socket.send({
        type: 'feedback_done',
        data: this.feedbackDone
      });
      this.results.positive = [...this.feedback.positive];
      this.results.negative = [...this.feedback.negative];
      this.results.general = [...this.feedback.general];
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

    if (this.checkbox)
      host.general = this.general;

    socket.send(host);
  }

  @action setFeedbackDone = () => {
    if (!this.feedbackDone) {
      this.feedbackDone = true;
      socket.send({
        type: 'feedback_done',
        data: this.feedbackDone
      });
      this.results.positive = [...this.feedback.positive];
      this.results.negative = [...this.feedback.negative];
      this.results.general = [...this.feedback.general];
    }
  }

  @action sort = (nameOfArrayToSort) => {
    console.log('fuck');
    switch (nameOfArrayToSort) {
      case 'positive':
        this.results.positive = this.results.positive.sort((b, a) => {
          if (a.votes !== undefined && b.votes !== undefined)
            return a.votes.length - b.votes.length;
          if (a.votes !== undefined) return 1;
          if (b.votes !== undefined) return -1;
          return 0;
        });
        break;
      case 'negative':
        this.results.negative = this.results.negative.sort((b, a) => {
          if (a.votes !== undefined && b.votes !== undefined)
            return a.votes.length - b.votes.length;
          if (a.votes !== undefined) return 1;
          if (b.votes !== undefined) return -1;
          return 0;
        });
        break;
      case 'general':
        this.results.general = this.results.general.sort((b, a) => {
          if (a.votes !== undefined && b.votes !== undefined)
            return a.votes.length - b.votes.length;
          if (a.votes !== undefined) return 1;
          if (b.votes !== undefined) return -1;
          return 0;
        });
        break;
      default:
        break;
    }
  }

}

export default new CreateStore();
