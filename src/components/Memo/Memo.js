import React from 'react';
import PropTypes from 'prop-types';
import './Memo.css';

const Memo = ({memo, removeMemo, updateMemo, onClick}) => (
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
  removeMemo: PropTypes.func,
  updateMemo: PropTypes.func,
  onClick: PropTypes.func
}

Memo.defaultProps = {
  memo: {},
  removeMemo: () => { console.error('removeMemo not defined') },
  toggleMemo: () => { console.error('toggleMemo not defined') },
  onClick: () => { console.error('onClick not defined') },
}

export default Memo;
