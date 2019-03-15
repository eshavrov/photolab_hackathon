import React, { Component, Fragment } from 'react';
import Reply from './Reply';

class MessageList extends Component {
  render() {
    const { messages = [] } = this.props;
    return (
      <>
        {messages.map((message, i) => {
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
                <Reply text={message.text} author={message.name} timestamp={message.date} my={message.my} />
                // <div
                //   style={{
                //     width: '400px',
                //     padding: '10px',
                //     margin: '10px',
                //     background: message.my ? 'yellow' : '#eee',
                //     marginLeft: message.my ? '180px' : '0',
                //   }}
                // >
                //   <div>{message.text}</div>
                //   <div style={{ marginTop: '20px' }}>{message.name || 'Unknown person'}</div>
                //   <div>{`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</div>
                // </div>
              )}
            </Fragment>
          );
        })}
      </>
    );
  }
}

export default MessageList;
