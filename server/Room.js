class Room {
  constructor(id) {
    this.id = id;
    this.clients = new Set();
    this.messages = [];
  }

  join(client) {
    if (client.room) {
      throw new Error('Client already in room');
    }
    this.clients.add(client);
    client.room = this;
  }

  leave(client) {
    if (client.room !== this) {
      throw new Error('Client not in room');
    }
    this.clients.delete(client);
    client.room = null;
  }

  addMessage(msg) {
    const data = {
      image: null,
      text: (msg.data && msg.data.text) || null,
      src: msg.src || null,
      date: Date.now(),
      name: msg.name,
    };

    this.messages.push({ ...data, clientId: msg.clientId });

    return { ...data, type: 'message' };
  }
}

module.exports = Room;
