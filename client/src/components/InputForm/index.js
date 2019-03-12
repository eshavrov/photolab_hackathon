import React, { Component } from 'react';

class InputForm extends Component {
  _onSubmit = event => {
    const { onChange } = this.props;
    event.preventDefault();
    if (!onChange) return;
    const input = event.target.elements.input;

    onChange(input.value);
    input.value = '';
  };

  render() {
    const { label } = this.props;
    return (
      <form onSubmit={this._onSubmit}>
        <label>
          {label} <input type="text" id="input" />
        </label>
      </form>
    );
  }
}

export default InputForm;
