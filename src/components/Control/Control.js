import React, { Component } from 'react';
import './Control.css';

class Control extends Component {
  state = {
    content: ''
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.setState({
      content: this.props.memo.content
    })
  }


  render() {
    return (
      <div className="controlwrapper">
        <input
          type="text"
          placeholder="메모를 입력하세요"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />

      <button onClick={() => { this.props.updateMemo(this.props.memo.id, this.state.content) }}>수정</button>
      <button onClick={() => { this.props.removeMemo(this.props.memo.id) }}>삭제</button>
      </div>
    );
  }

}

export default Control;
