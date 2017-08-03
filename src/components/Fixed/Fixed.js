import React from 'react';
import './Fixed.css';

const Fixed = ({modalOpen}) => (
  <div className="fixed" onClick={() => { modalOpen('create', { id: '', content: '' }) }} >
    +
  </div>
)

export default Fixed;
