import React, { Component } from 'react';

class RadioGroup extends Component {
  _onChange = ({ target: { value } }) => {
    const { onChange, name } = this.props;

    if (!onChange) {
      return;
    }

    onChange(name, value);
  };

  render() {
    const { values, name, label } = this.props;
    return (
      <div onChange={this._onChange}>
        <div className="label">{label} </div>
        {values.map(({ value, label }, index) => (
          <label className="input">
            <input key={index} type="radio" name={name} value={value} />
            <div>{label} </div>
          </label>
        ))}
      </div>
    );
  }
}

export default RadioGroup;
