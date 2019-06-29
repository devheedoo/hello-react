// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // 현재 상태를 
    this.props.onEnroll(this.state);
    // 입력 폼 초기화
    this.setState({
      name: '',
      phone: ''
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
        />
        <input
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChange}
          name="phone"
        />
        <button type="submit">Register</button>
      </form>
    )
  }
}

export default PhoneForm;