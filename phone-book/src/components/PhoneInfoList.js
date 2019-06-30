import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

// 연락처 목록
class PhoneInfoList extends Component {

  // 잠깐 헷갈려서 복잡하자면
  // props:
  // - 자식 컴포넌트에게 주는 값이다.
  // - 자식 컴포넌트는 직접 수정할 수 없다.
  // - 그럼 부모는 계속 업데이트 가능한가?
  // state:
  // - 컴포넌트 내부에서 선언하며 값 변경 가능하다.

  // 그렇다면 이 앱에서 props를 쓰면 부모는 PhoneInfoList, 자식은 PhoneInfo?

  static defaultProps = {
    dataInfoList: [],

    // App에서 PhoneInfoList 컴포넌트를 사용할 때
    // <PhoneInfoList> 요소에 onRemove 속성이 없으면 다음 코드가 실행된다.
    onRemoveInfoList: () => console.warn('onRemove is not defined.'),
    // onUpdate도 마찬가지다.
    onUpdateInfoList: () => console.warn('onUpdate is not defiend.')
  }

  // 성능 최적화
  // shouldComponentUpdate() 반환값이 true일 때만 컴포넌트가 업데이트된다.
  // 컴포넌트가 업데이트돼야 렌더링도 일어난다.
  // 즉 아래처럼 작성하면 props가 변하지 않으면 업데이트 안 일어나고 렌더링도 안 일어난다.
  // 이렇게 전후 상태를 비교하려면 불변성을 지켜줘야 한다.
  // 비교할 객체를 유지하면서 변경 후에는 새 객체를 만드는 것이다.
  // push, splice, unshift, pop 대신 concat, slice, map, filter 사용
  // 기존 객체를 그대로 두고 새 객체를 만들어서 내용을 복사해서 사용한다.
  // ex) information: information.map(
  //                    info => id === info.id
  //                      ? { ...info, ...data }
  //                      : info
  //                  )
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.dataInfoList !== this.props.dataInfoList;
  }

  // PhoneInfo 객체 속성의 key 값 중요! 언제가 고유(unique)해야 한다.
  render() {

    // 이 라인에 대한 정확한 이해가 필요하다.
    // props를 받아와서 data, onRemove, onUpdate?
    // 이름이 다 같으니 헷갈린다. 정확히 구분하면서 이해하자.

    /*  얘랑 얘랑 같은 코드다.

      this.setState({
        number: this.state.number + 1
      });

      this.setState(
        ({ number }) => ({
          number: number + 1
        })
      );
      
      이 컴포넌트의 state 목록에서 number를 가져와 임시 변수로 저장한다.
      const { number } = this.state;
      그리고 사용한다. 그렇다면 윗줄의 number는 state 목록에 있는 속성이어야만 한다.
      this.setState({
        number: number + 1
      });

    */

    /*  아래 코드 친해질 때까지 자주 읽자. 둘이 +- 빼고는 같은 코드다.

      handleIncrease = () => {
        const { number } = this.state;
        this.setState({
          number: number + 1
        });
      }

      handleDecrease = () => {
        this.setState(
          ({ number }) => ({
            number: number - 1
          })
        );
      }
    */

    console.log('Render PhoneInfoList...')

    const { dataInfoList, onRemoveInfoList, onUpdateInfoList } = this.props;

    const list = dataInfoList.map(
      info => (
        <PhoneInfo
          key={info.id}
          info={info}
          onRemoveInfo={onRemoveInfoList}
          onUpdateInfo={onUpdateInfoList}
        />
      )
    );

    return (
      <div>{list}</div>
    )
  }
}

export default PhoneInfoList;