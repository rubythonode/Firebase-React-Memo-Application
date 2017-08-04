import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ navOpen }) => (
  <div className="header">
    <h3>MEMO</h3>
    <div className="toggle" onClick={() => { navOpen() }}>&equiv;</div>
  </div>
)

Header.PropTypes = {
  navOpen: PropTypes.func
}

Header.defaultProps = {
  navOpen: () => { console.error('navOpen not defined') }
}


export default Header;
