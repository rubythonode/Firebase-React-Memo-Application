import React, { Component } from 'react';
import './Create.css';

class Create extends Component {
  state = {
    content: ''
  }
  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleClick = () => {
    this.props.createMemo(this.state.content)
    this.props.modalClose()
    // 초기화 작업
    this.setState({
      content: ""
    });
  }

  handleKeyDown = (e) => {
    if(e.keyCode == 13) {
      this.handleClick();
    }

    if(e.keyCode == 27) {
      this.props.modalClose()
    }

  }

  render() {
    return (
      <input
        type="text"
        className="form"
        placeholder="메모를 입력하세요"
        value={this.state.content}
        onChange={this.handleChange}
        name="content"
        onKeyDown={this.handleKeyDown}
      />
    );
  }

}

export default Create;
