import React, { Component } from 'react';

class MessageList extends Component {
  render() {
    const { messages = [] } = this.props;
    return (
      <div style={{ width: '600px', padding: '10px', margin: '10px', background: '#aaa' }}>
        {messages.map((message, i) => {
          const date = new Date(message.date);
          console.log('****', message.date, date);

          return (
            <div
              key={i}
              style={{
                width: '400px',
                padding: '10px',
                margin: '10px',
                background: message.my ? 'yellow' : '#eee',
                marginLeft: message.my ? '180px' : '0',
              }}
            >
              <div>{message.text}</div>
              <div style={{ marginTop: '20px' }}>{message.name || 'Unknown person'}</div>
              <div>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
