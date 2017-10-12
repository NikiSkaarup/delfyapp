const URL = "ws://localhost:8001";

class SocketHandler {
  subscribers = [];
  ws;

  reconnect = () => {
    this.ws = new WebSocket(URL);
    this.ws.onopen = (evt) => { this.onOpen(evt) };
    this.ws.onclose = (evt) => { this.onClose(evt) };
    this.ws.onmessage = (evt) => { this.onMessage(evt) };
    this.ws.onerror = (evt) => { this.onError(evt) };
  }

  onOpen = (evt) => {
    console.log('Websocket Opened')
  }

  onMessage = (evt) => {
    this.subscribers.forEach((subscriber) => {
      subscriber(evt.data);
    });
  }

  onClose = (evt) => {
    console.log('Websocket Closed')
    setTimeout(this.reconnect, 2000);
  }

  onError = (evt) => {
    console.log('Websocket Error: ' + evt.data);
  }

  send(data) {
    this.ws.send(data);
  }

  subscribe(callback) {
    if (this.subscribers.length === 0)
      this.reconnect();
    this.subscribers.push(callback);
  }

}

const socketHandler = new SocketHandler();
export default socketHandler;
