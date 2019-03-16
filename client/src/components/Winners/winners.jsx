import React, { Component } from 'react';

class Winner extends Component {
  render() {
    const { pov, imp } = this.props;

    return (
      <div className="winners-board" style={
        {
          display: 'flex',
          margin: '8px auto',
          maxWidth: '720px'
        }
      }>
        <div className="pov" style={
          {
            flex: `${pov} 0 40px`,
            border: '1px solid green',
            backgroundColor: 'white',
            color: 'black',
            textAlign: 'left',
            fontWeight: 'bold',
            padding: '5px'
          }
        }>
          {pov > imp && (
            <span style={
              {
                float: 'right'
              }
            }>Побеждает команда повстанцев</span>
          )}
          {pov}
        </div>
        <div className="imp" style={
          {
            flex: `${imp} 0 40px`,
            border: '1px solid green',
            backgroundColor: 'blue',
            color: 'white',
            textAlign: 'right',
            fontWeight: 'bold',
            padding: '5px'
          }
        }>
          {pov < imp && (
            <span style={
              {
                float: 'left'
              }
            }>Побеждает команда империи</span>
          )}
          {imp}
        </div>
      </div >
    )
  }
}

export default Winner;
