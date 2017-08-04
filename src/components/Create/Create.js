import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Create.css';

class Create extends Component {

  state = {
    content: ''
  }

  // 키보드 입력값 상태 반영
  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  // 데이터 추가시
  handleClick = () => {
    const { createMemo, modalClose } = this.props;
    const { content } = this.state;

    // 데이터 추가 로직
    createMemo(content);

    // 모달 닫기
    modalClose()

    // 초기화 작업
    this.setState({
      content: ""
    });
  }

  // 키보드 입력 감지
  handleKeyDown = (e) => {
    // Enter 입력시 데이터 추가
    if(e.keyCode === 13) this.handleClick();

    // ESC 누르면 모달 닫기
    if(e.keyCode === 27) this.props.modalClose()


  }

  render() {
    const { content } = this.state;
    const { handleChange, handleKeyDown } = this;
    return (
      <input
        type="text"
        className="form"
        placeholder="메모를 입력하세요"
        value={content}
        name="content"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    );
  }

}



Create.PropTypes = {
  createMemo: PropTypes.func,
  modalClose: PropTypes.func
}

Create.defaultProps = {
  createMemo: () => { console.error('createMemo not defined') },
  modalClose: () => { console.error('modalClose not defined') },
}

export default Create;
