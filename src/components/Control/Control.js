import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Control.css';

// [완료]

class Control extends Component {
  state = {
    content: ''
  }


  // 입력받은 키보드 값을 상태 반영
  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  componentDidMount() {
    // 받은 props를 입력폼에 적용 (이전에 입력한 값을 받기 위함)
    const { memo } = this.props;

    this.setState({
      content: memo.content
    })
  }


  render() {
    const { content } = this.state;
    const {
      updateMemo,
      removeMemo,
      memo: {
        id
      }
    } = this.props;

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
        <div className="controlbtn" onClick={() => { updateMemo(id, content) }}>수정</div>
        <div className="controlbtn" onClick={() => { removeMemo(id) }}>삭제</div>
      </div>
      </div>
    );
  }
}

Control.PropTypes = {
  memo: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string
  }),
  updateMemo: PropTypes.func,
  removeMemo: PropTypes.func
}

Control.defaultProps = {
  memo: {
    id: ''
  },
  updateMemo: () => { console.error('updateMemo not defined') },
  removeMemo: () => { console.error('removeMemo not defined') },
}

export default Control;
