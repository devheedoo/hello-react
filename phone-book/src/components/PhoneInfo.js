import React, { Component } from 'react';

// 연락처 카드
class PhoneInfo extends Component {
  // 디폴트 입력값
  // 우리는 info 라는 객체를 props 로 받아와서 렌더링 해줄것입니다. 그런데, 우리가 실수로 info 값을 전달해주는것을 까먹게 된다면 컴포넌트가 크래쉬 될 것입니다. info 가 undefined 일 때에는 비구조화 할당을 통해 내부의 값을 받아올 수 없기 때문입니다.

  /*
  static defaultProps = {
    info: {
      // 디폴트 0으로 하면 계속 빈 값 추가할 때 0이 중복되서 문제될 것 같은데?
      // -> 빈 값은 빈 값으로 등록된다. defaultProps는 정확히 무슨 역할을 하는 걸까?
      // -> 한 번 지워보자
      // -> 아직 잘 모르겠다.
      id: 0,
      name: '이름',
      phone: '010-0000-0000',
    }
  }
  */

  handleRemoveOnInfo = () => {
    const { info, onRemoveInfo } = this.props;
    onRemoveInfo(info.id);
  }

  render() {
    // 연락처 카드 요소 CSS
    const style= {
      border : '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    // 변수 저장
    const { id, name, phone } = this.props.info;
    
    // 당연히 id 값은 표시할 필요 없다.
    return (
      <div style={style}>
        <div>{id}</div>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleRemoveOnInfo}>Remove</button>
      </div>
    )
  }
}

export default PhoneInfo;