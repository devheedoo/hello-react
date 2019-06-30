import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  // 초기 데이터 설정
  // id 시작값
  id = 2;
  // 데이터
  state = {
    information: [
      {
        id: 0,
        name: 'Heedo Kim',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'Tony Stark',
        phone: '010-1111-1111'
      }
    ],
    keyword: ''
  };

  handleCreateOnApp = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    });
  }

  // PhoneInfo 에서 Remove 버튼을 누르면 PhoneInfo.handleRemove() 호출하고,
  // PhoneInfo.handleRemove() 함수에서 onRemove(info.id); 를 호출하는데
  // onRemove 함수는 PhoneInfoList 컴포넌트에 정의되어 있다.
  // const { info, onRemove } = this.props; 써서 그런가?
  // 아니면 처음에 불러올 때 PhoneInfoList에서 불러와서 그런가?
  // 어떻게 부모 컴포넌트에서 정의한 함수를 바로 쓰지? 
  // -> const 코드 제거했더니 바로 정의되지 않음 오류 발생
  // 아직 props, state와 친해지지 못한 것 같다.
  // 결국 onRemove의 정의는 App.js의 PhoneInfoList 요소 속성에서 하는 건가?
  // -> PhoneInfoList 요소에서 onRemove 속성명을 바꿔줬더니
  // 오류는 발생 안 하지만 기능이 제대로 동작하지 않는다.
  // 그리고 PhoneInfoList 컴포넌트의 defaultProps 에 있는 onRemove를 호출한다.

  handleRemoveOnApp = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  // ...info, ...data 부분 정확히 이해 필요
  /*  전개연산자 이용해서 이렇게 해야 객체형 state 안쪽 값을 업데이트할 수 있다.
      foo 객체의 내용을 다 적고, foobar: 2를 덮어씌운다. 와 같은 의미라고 한다.
    this.setState({
      number: 0,
      foo: {
        ...this.state.foo,
        foobar: 2
      }
    });
  */

  handleUpdateOnApp = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
          // 기존 info 내용을 다 저장한 후, data도 덮어씌운다.
          ? { ...info, ...data }
          // 그대로 유지한다.
          : info
      )
    });
  }

  // 중요: 컴포넌트 state가 업데이트되면 리렌더링이 발생하는데,
  // 부모 컴포넌트가 리렌더링되면 자식 컴포넌트도 리렌더링된다.
  handleChangeOnAppKeyword = (e) => {
    this.setState({
      keyword: e.target.value
    });
  }

  // 컴포넌트 요소의 속성으로 설정하면
  // ex) <PhoneForm onCreateForm ... />
  // 그 컴포넌트에서 this.props로 사용할 수 있다.
  // ex) const { onCreateForm } = this.props;
  // 복습하면 props는 자식 컴포넌트에서 변경할 수 없다.
  render() {
    const { information, keyword } = this.state;

    const searchResult = information.filter(
      // TODO: 대소문자 구분하지 않도록
      info => info.name.indexOf(keyword) !== -1
    );

    return (
      <div>
        <PhoneForm
          onCreateForm={this.handleCreateOnApp}
        />
        <p>
          <input
            placeholder="Search ..."
            name="keyword"
            value={keyword}
            onChange={this.handleChangeOnAppKeyword}
          />
        </p>
        <PhoneInfoList
          dataInfoList={searchResult}
          onRemoveInfoList={this.handleRemoveOnApp}
          onUpdateInfoList={this.handleUpdateOnApp}
        />
      </div>
    )
  }
}

export default App;