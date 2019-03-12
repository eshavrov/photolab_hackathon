const WebSocketServer = require('ws').Server;
const Room = require('./Room');
const Client = require('./Client');

const server = new WebSocketServer({ port: 8081 });

const rooms = new Map();

function createId(len = 8, chars = 'abcdefghjkmnopqrstvwxyz0123456789') {
  let id = '';
  while (len--) {
    id += chars[Math.floor(Math.random() * (chars.length - 0.01))];
  }
  return id;
}

function createClient(conn, id = createId()) {
  return new Client(conn, id);
}

function createRoom(id = createId()) {
  if (rooms.has(id)) {
    throw new Error(`Room ${id} already exists`);
  }

  const room = new Room(id);
  console.log('Creating room', room);
  rooms.set(id, room);

  return room;
}

function getRoom(id) {
  return rooms.get(id);
}

function broadcastRoom(room) {
  const clients = [...room.clients];
  clients.forEach(client => {
    client.send({
      type: 'room',
      id: room.id,
      messages: room.messages.map(message => ({ ...message, my: message.clientId === client.id })),
      clientId: client.id,
      clients: clients.map(client => {
        return {
          id: client.id,
          name: client.user.name,
          fraction: client.user.fraction,
        };
      }),
    });
  });
}

server.on('connection', conn => {
  console.log('Connection established');
  const client = createClient(conn);

  conn.on('message', msg => {
    console.log('Message received', msg);
    const data = JSON.parse(msg);

    switch (data.type) {
      case 'room': {
        const room = getRoom(data.id) || createRoom(data.id);
        room.join(client);
        client.state = data.state;
        broadcastRoom(room);
        break;
      }

      case 'message': {
        const room = getRoom(data.id);
        data.clientId = client.id;
        data.name = client.user.name;

        client.broadcast(room.addMessage(data));
        break;
      }

      case 'set-user': {
        data.id = client.id;
        client.broadcast(client.setUserData(data));
        break;
      }
      default:
    }
  });

  conn.on('close', () => {
    console.log('Connection closed');
    const room = client.room;
    if (room) {
      room.leave(client);
      if (room.clients.size === 0) {
        rooms.delete(room.id);
      }
    }

    broadcastRoom(room);
    console.log('Rooms:', rooms);
  });
});
