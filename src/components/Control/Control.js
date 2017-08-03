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
      <div>
        <input
          type="text"
          placeholder="메모를 입력하세요"
          className="control"
          name="content"
          value={this.state.content}
          onChange={this.handleChange}
        />

      <div className="controlwrapper">
        <div className="controlbtn" onClick={() => { this.props.updateMemo(this.props.memo.id, this.state.content) }}>수정</div>
        <div className="controlbtn" onClick={() => { this.props.removeMemo(this.props.memo.id) }}>삭제</div>
      </div>
      </div>
    );
  }

}

export default Control;
