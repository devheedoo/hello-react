// file: src/components/PhoneForm.js
import React, { Component } from 'react';

class PhoneForm extends Component {
  state = {
    name: '',
    phone: ''
  }
  handleChangeOnForm = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  handleSubmitOnForm = (e) => {
    e.preventDefault();
    // 입력된 현재 상태를 부모 컴포넌트로 전달하는 수단
    // <PhoneForm onEnroll={this.handleCreateOnApp} /> 코드를 통해 props 정의?
    this.props.onCreateForm(this.state);
    // 입력 폼 초기화
    this.setState({
      name: '',
      phone: ''
    });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmitOnForm}>
        <input
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleChangeOnForm}
          name="name"
        />
        <input
          placeholder="Phone"
          value={this.state.phone}
          onChange={this.handleChangeOnForm}
          name="phone"
        />

        <p>this.state.name: {this.state.name ? this.state.name : 'empty'}</p>
        <p>this.state.phone: {this.state.phone ? this.state.phone: 'empty'}</p>

        <button type="submit">Register</button>
      </form>
    )
  }
}

export default PhoneForm;