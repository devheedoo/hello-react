import React, { Component } from 'react';

// 연락처 카드
class PhoneInfo extends Component {
  // 디폴트 입력값
  // 우리는 info 라는 객체를 props 로 받아와서 렌더링 해줄것입니다. 그런데, 우리가 실수로 info 값을 전달해주는것을 까먹게 된다면 컴포넌트가 크래쉬 될 것입니다. info 가 undefined 일 때에는 비구조화 할당을 통해 내부의 값을 받아올 수 없기 때문입니다.

  static defaultProps = {
    info: {
      // 디폴트 0으로 하면 계속 빈 값 추가할 때 0이 중복되서 문제될 것 같은데?
      // 빈 값은 빈 값으로 등록된다. defaultProps는 정확히 무슨 역할을 하는 걸까?
      // 한 번 지워보자
      // 아직 잘 모르겠다.
      // 등록 기능은 PhoneInfo의 state 값이랑 상관없다. PhoneForm에서 데이터가 전달되니까.
      // 부모 컴포넌트에서 이 컴포넌트를 정의할 때 속성 값으로 넣는데, 속성 값이 없을 경우
      // defaultProps 값이 사용된다.
      id: 0,
      name: '이름',
      phone: '010-0000-0000',
    }
  }

  state = {
    // 수정 버튼을 눌렀을 때 editing: true
    // 빈 input 요소를 숨겨두었다가 수정 누르면 현재 값을 input에 로딩하면서 보여준다.
    // div가 input으로 바뀌는 것이다.
    editing: false,
    name: '',
    phone: ''
  }

  handleRemoveOnInfo = () => {
    const { info, onRemoveInfo } = this.props;
    onRemoveInfo(info.id);
  }

  // editing 값 토글
  handleToggleEditOnInfo = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  // 
  handleChangeOnInfo = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { info, onUpdateInfo } = this.props;
    // editing: false > true 변경 시
    if (!prevState.editing && this.state.editing) {
      this.setState({
        name: info.name,
        phone: info.phone
      });
    }
    if (prevState.editing && !this.state.editing) {
      onUpdateInfo(info.id, {
        name: this.state.name,
        phone: this.state.phone
      })
    }
  }

  // 성능 최적화
  // 항상 모든 Info를 렌더링하다가 이제 추가/수정한 Info만 렌더링한다.
  // 그런데 Edit 누르면 왜 렌더링이 2번 될까?
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.editing
        && !nextState.editing
        && nextProps.info === this.props.info) {
      return false;
    }
    return true;
  }

  render() {
    console.log('Render PhoneInfo ' + this.props.info.id);

    // 연락처 카드 요소 CSS
    const style= {
      border : '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    if (editing) {
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="Name"
              onChange={this.handleChangeOnInfo}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="Phone"
              onChange={this.handleChangeOnInfo}
            />
          </div>
          <button onClick={this.handleToggleEditOnInfo}>Apply</button>
          <button onClick={this.handleRemoveOnInfo}>Remove</button>
        </div>
      )
    }

    // if (!editing)

    // 변수 저장
    const { id, name, phone } = this.props.info;
    
    // 당연히 id 값은 표시할 필요 없다.
    return (
      <div style={style}>
        <div>{id}</div>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEditOnInfo}>Edit</button>
        <button onClick={this.handleRemoveOnInfo}>Remove</button>
      </div>
    )
  }
}

export default PhoneInfo;