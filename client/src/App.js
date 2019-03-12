import React, { Component } from 'react';
import './App.css';
import InputForm from './components/InputForm';
import MessageList from './components/MessageList';

class App extends Component {
  state = {
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
    console.log(this.state.clients, id, name);
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

  componentDidMount() {
    const { connectionManager } = this.props;

    connectionManager.events.listen('message', this._addMessage);
    connectionManager.events.listen('room', this._updateRoom);
    connectionManager.events.listen('set-user', this._setUser);
  }

  render() {
    const { messages, name, clients } = this.state;

    return (
      <div className="App">
        <div>
          {clients.length}:{clients.reduce((acc, client) => `${acc}, ${client.name || 'Unknown person'}`, '')}
        </div>
        <div>{name ? name : 'Представьтесь'}</div>
        {!name && <InputForm label="Никнейм" onChange={this._onChangeName} />}
        {name && <InputForm label="Напиши сообщение" onChange={this._onChange} />}

        <MessageList messages={messages} />
      </div>
    );
  }
}

export default App;
