import React from 'react';
import PropTypes from 'prop-types';
import './Fixed.css';

const Fixed = ({modalOpen}) => (
  <div className="fixed" onClick={() => { modalOpen('create', { id: '', content: '' }) }} >
    +
  </div>
)

Fixed.PropTypes = {
  modalOpen: PropTypes.func
}

Fixed.defaultProps = {
  modalOpen: () => { console.error('modalOpen not defined') }
}

export default Fixed;
