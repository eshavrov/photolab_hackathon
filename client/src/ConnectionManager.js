import Events from './events';

export default class ConnectionManager {
  constructor() {
    this.conn = null;
    this.events = new Events();
  }

  connect(address) {
    this.conn = new WebSocket(address);

    this.conn.addEventListener('open', () => {
      console.log('Connection established');
      this.initRoom();
    });

    this.conn.addEventListener('message', event => {
      console.log('Received message', event.data);
      this.receive(event.data);
    });
  }

  initRoom() {
    const roomId = window.location.hash.split('#')[1] || 'all';
    this.send({
      type: 'room',
      id: roomId,
    });
  }

  receive(msg) {
    const { type, ...data } = JSON.parse(msg);

    switch (type) {
      case 'room':
        window.location.hash = data.id;
        this.events.emit('room', data);
        break;
      case 'message':
        this.events.emit('message', data);
        break;
      case 'set-user':
        this.events.emit('set-user', data);
        break;
      default:
    }
  }

  send(data) {
    const msg = JSON.stringify(data);
    console.log('Sending message', msg);
    this.conn.send(msg);
  }

  setUserName(name, fraction = 0) {
    this.send({
      type: 'set-user',
      name,
      fraction,
    });
  }

  sendMessage(data) {
    const roomId = window.location.hash.split('#')[1] || 'all';
    this.send({
      type: 'message',
      id: roomId,
      data,
    });
  }
}
