import React, { Component } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import MessageList from './components/MessageList';
import { fighters, ship_types } from './game/fighters';
import { data } from './data';

const IMAGE_STATUS = {
  NULL: Symbol('NULL'),
  SELECTED: Symbol('SELECTED'),
  WAITING: Symbol('WAITING'),
  SEND: Symbol('SEND'),
};

class App extends Component {
  state = {
    uploading: false,
    status: IMAGE_STATUS.NULL,
    formData: null,
    clientId: null,
    name: null,
    fraction: null,
    shipType: null,
    messages: [],
    clients: [],
  };

  _updateRoom = ({ messages, clientId, clients }) => {
    console.log('>>>>>_updateRoom>>>>>>>', messages, clientId, clients);

    this.setState({
      clientId,
      clients,
      messages: [...messages],
    });

    clients.forEach(({ name, fraction, id }) => {
      if (name) fighters.add(id, { name, spaceship: ship_types.TIEFighter });
    });
  };

  _setUser = ({ name, fraction, id }) => {
    const { clientId } = this.state;
    console.log('>>>>>_setUser>>>>>>>', name, fraction, id);
    fighters.add(id, { name, spaceship: ship_types.Fighter });

    if (clientId !== id) {
      this.setState(state => ({
        clients: state.clients.map(client => (client.id !== id ? client : { ...client, name })),
      }));
    } else {
      this.setState(state => ({
        clients: state.clients.map(client => (client.id !== id ? client : { ...client, name })),
        name,
        fraction,
      }));
    }
  };

  _addMessage = msg => {
    this.setState(state => ({
      messages: [...state.messages, msg],
    }));
    console.log(msg);
    if (msg.my) {
      this.list.scrollTop = Math.ceil(this.list.scrollHeight - this.list.clientHeight);
    }
  };

  _onChangeName = username => {
    const { connectionManager } = this.props;
    connectionManager.setUserName(username);
  };

  _onChange = text => {
    const { connectionManager } = this.props;
    connectionManager.sendMessage({ text });
  };

  _onChangeImage = e => {
    this.setState({ status: IMAGE_STATUS.WAITING });

    const files = Array.from(e.target.files);
    const file = files[0];
    const reader = new FileReader();

    reader.onload = e => {
      const rawData = e.target.result;

      this.setState({
        file: {
          filename: file.name,
          size: file.size,
          contentType: file.type,
          rawData,
        },
        status: IMAGE_STATUS.SELECTED,
      });
    };

    reader.readAsArrayBuffer(file);
  };

  _onChangeSend = () => {
    const { file } = this.state;
    const { connectionManager } = this.props;

    connectionManager.sendImage(file);
    this.setState({ uploading: true, status: IMAGE_STATUS.NULL });
  };

  componentDidMount() {
    const { connectionManager } = this.props;

    connectionManager.events.listen('message', this._addMessage);
    connectionManager.events.listen('room', this._updateRoom);
    connectionManager.events.listen('set-user', this._setUser);
  }

  render() {
    const { messages, name, fraction, shipType, clients, status } = this.state;
    // return (
    //   <div className="layout">
    //     {/* <div className="text-field"> */}
    //     {!name && fraction === null && !shipType && (
    //       <InputForm label="Твое имя, кадет?" onChange={this._onChangeName} />
    //     )}
    //     {name && fraction === null && !shipType && (
    //       <InputForm label="Выбери свою сторону!" onChange={this._onChangeName} />
    //     )}

    //     {/* </div> */}
    //   </div>
    // );
    return (
      <div className="layout">
        <div className="perspective">
          {/* <div>
            {clients.length}:{clients.reduce((acc, client) => `${acc}, ${client.name || 'Unknown person'}`, '')}
          </div> */}
          <div
            className="message-list"
            ref={node => {
              this.list = node;
            }}
          >
            <pre>
              {`
   8888888888  888    88888       
   88     88   88 88   88  88      
    8888  88  88   88  88888       
      88  88 888888888 88   88     
8888888   88 88     88 88    888888

88  88  88   888    88888    888888
88  88  88  88 88   88  88  88     
88 8888 88 88   88  88888    8888  
 888  888 888888888 88   88     88 
  88  88  88     88 88    8888888  
  
   Добро пожаловать в общий чат    
      Империи и повстанцев!        `}
            </pre>
            <MessageList messages={messages} />
          </div>
        </div>
        <div className="text-field">
          <div>{name ? name : 'Представьтесь'}</div>
          {!name && <InputForm label="Твое имя, кадет?" onChange={this._onChangeName} />}
          {name && (
            <>
              <InputForm label="" onChange={this._onChange} />
              {/* <input type="file" id="single" onChange={this._onChangeImage} />
              {status === IMAGE_STATUS.SELECTED && <button onClick={this._onChangeSend}>+</button>} */}
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
