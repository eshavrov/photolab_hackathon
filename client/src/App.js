import React, { Component } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import MessageList from './components/MessageList';

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
    fraction: 0,
    messages: [],
    clients: [],
  };

  _updateRoom = ({ messages, clientId, clients }) => {
    this.setState({
      clientId,
      clients,
      messages: [...messages],
    });
  };

  _setUser = ({ name, fraction, id }) => {
    const { clientId } = this.state;
    //console.log(this.state.clients, id, name);
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
    const { messages, name, clients, status } = this.state;

    return (
      <div className="App">
        <div>
          {clients.length}:{clients.reduce((acc, client) => `${acc}, ${client.name || 'Unknown person'}`, '')}
        </div>
        <div>{name ? name : 'Представьтесь'}</div>
        {!name && <InputForm label="Никнейм" onChange={this._onChangeName} />}
        {name && (
          <>
            <InputForm label="Напиши сообщение" onChange={this._onChange} />
            <input type="file" id="single" onChange={this._onChangeImage} />
            {status === IMAGE_STATUS.SELECTED && <button onClick={this._onChangeSend}>+</button>}
          </>
        )}

        <MessageList messages={messages} />
      </div>
    );
  }
}

export default App;
