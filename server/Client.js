class Client {
  constructor(conn, id) {
    this.conn = conn;
    this.id = id;
    this.room = null;
    this.user = {
      name: null,
      fraction: 0,
    };
  }

  broadcast({ clientId, ...data }) {
    if (!this.room) {
      throw new Error('Can not broadcast without room');
    }

    // data.clientId = this.id;
    data.name = this.user.name;
    const clients = [...this.room.clients];
    clients.forEach(client =>
      client.send({
        ...data,
        my: this.id === client.id,
      })
    );
  }

  send(data) {
    const msg = JSON.stringify(data);
    console.log(`Sending message ${msg}`);
    this.conn.send(msg, err => {
      if (err) {
        console.log('Error sending message', msg, err);
      }
    });
  }

  setUserData(data) {
    const { name, fraction } = data;
    this.user = { name, fraction };
    return data;
  }
}

module.exports = Client;
