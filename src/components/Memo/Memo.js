import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Memo.css';

const Memo = ({memo, index, removeMemo, updateMemo, onClick}) => (
  <div className="memowrapper" onClick={onClick}>
      <div className="memo">
        <div className="squre">
          <h1>{memo.content}</h1>
        </div>
      </div>
  </div>
)

Memo.PropTypes = {
  memo: PropTypes.shape({
    content: PropTypes.string,
    id: PropTypes.string
  }),
  index: PropTypes.number,
  removeMemo: PropTypes.func,
  updateMemo: PropTypes.func
}

Memo.defaultProps = {
  memo: {},
  index: -1,
  toggle: false,
  removeMemo: () => { console.error('removeMemo not defined') },
  toggleMemo: () => { console.error('toggleMemo not defined') },
}

export default Memo;
