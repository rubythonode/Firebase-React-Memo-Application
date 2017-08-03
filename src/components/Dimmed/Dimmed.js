import React from 'react';
import './Dimmed.css';

const Dimmed = ({visible}) => {
  if(visible) return (<div className="screen"></div>)
  return null;
}

export default Dimmed;
