import React from 'react';
import PropTypes from 'prop-types';
import './Dimmed.css';


const Dimmed = ({visible}) => {
  if(visible) return (<div className="screen"></div>)
  return null;
}

Dimmed.PropTypes = {
  visible: PropTypes.string
}

Dimmed.defaultProps = {
  visible: ''
}

export default Dimmed;
