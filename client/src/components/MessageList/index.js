import React, { Component, Fragment } from 'react';

class MessageList extends Component {
  render() {
    const { messages = [] } = this.props;
    return (
      <div style={{ width: '600px', padding: '10px', margin: '10px', background: '#aaa' }}>
        {messages.map((message, i) => {
          const date = new Date(message.date);

          return (
            <Fragment key={i}>
              {message.src && (
                <div
                  style={{
                    width: '400px',
                    margin: '10px',
                    marginLeft: message.my ? '180px' : '0',
                  }}
                >
                  <img src={message.src} width={400} alt="dskjdsl" />
                </div>
              )}
              {message.text && (
                <div
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
              )}
            </Fragment>
          );
        })}
      </div>
    );
  }
}

export default MessageList;
