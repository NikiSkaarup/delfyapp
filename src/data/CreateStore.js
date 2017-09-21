
import /*mobx,*/ { observable, computed, action, useStrict } from "mobx";

useStrict(true);
const URL = "ws://localhost:8001";

class CreateStore {
  @observable title = "";
  @observable num = 3;
  @observable positive = "";
  @observable negative = "";
  @observable checkbox = false;
  @observable general = "";

  @observable feedback = [];

  ws;

  constructor() {
    this.ws = new WebSocket(URL);
    this.ws.onopen = (evt) => { this.onOpen(evt) };
    this.ws.onclose = (evt) => { this.onClose(evt) };
    this.ws.onmessage = (evt) => { this.onMessage(evt, 'recieved') };
    this.ws.onerror = (evt) => { this.onError(evt) };
  }

  reconnect = () => {
    this.ws = new WebSocket(URL);
    this.ws.onopen = (evt) => { this.onOpen(evt) };
    this.ws.onclose = (evt) => { this.onClose(evt) };
    this.ws.onmessage = (evt) => { this.onMessage(evt, 'recieved') };
    this.ws.onerror = (evt) => { this.onError(evt) };
  }

  onOpen = (evt) => {
    console.log('Websocket Opened')
  }

  onMessage = (evt, caller) => {
    this.addMessage({
      "caller": caller,
      "message": evt.data
    })
  }

  onClose = (evt) => {
    console.log('Websocket Closed')
    setTimeout(this.reconnect, 2000);
  }

  onError = (evt) => {
    console.log('Websocket Error: ' + evt.data);
  }

  doSend = (data) => {
    this.ws.send(data);
  }

  sendMessage(message) {
    this.addMessage({
      "caller": "sent",
      "message": message
    });
    this.doSend(message);
  }

  @action addMessage(data) {
    console.log(data);
    //let messages = this.messages;
    //messages.push(data);
    //this.messages = messages;
  }

  @computed get getMessages() {
    return this.messages.filter(() => true);
  }

  @computed get getEvaluation() {
    return this.evaluation;
  }

  @action setTitle(title) {
    this.title = title;
  }

  @action setNum(num) {
    let numInteger = Number.parseInt(num);
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
}

export default new CreateStore();
