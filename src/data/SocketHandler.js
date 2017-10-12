const URL = "ws://localhost:8001";

class SocketHandler {
  subscribers = [];
  ws;

  constructor() {
    this.reconnect();
  }

  reconnect = () => {
    this.ws = new WebSocket(URL);
    this.ws.onopen = (evt) => { this.onOpen(evt) };
    this.ws.onclose = (evt) => { this.onClose(evt) };
    this.ws.onmessage = (evt) => { this.onMessage(evt) };
    this.ws.onerror = (evt) => { this.onError(evt) };
  }

  onOpen = (evt) => {
    console.log('Websocket Opened');
  };

  onMessage = (evt) => {
    console.log(evt);
    console.log(evt.data);
    let data = JSON.parse(evt.data);
    console.log(data);
    this.subscribers.forEach((subscriber) => {
      subscriber(data);
    });
  };

  onClose = (evt) => {
    console.log('Websocket Closed')
    setTimeout(this.reconnect, 2000);
  };

  onError = (evt) => {
    console.log('Websocket Error: ' + evt.data);
  };

  send = (data) => {
    this.ws.send(JSON.stringify(data));
  };

  subscribe = (callback) => {
    console.log('subscribe');
    //if (this.subscribers.length === 0)
    //this.reconnect();
    this.subscribers.push(callback);
  }

}

const socketHandler = new SocketHandler();
export default socketHandler;
