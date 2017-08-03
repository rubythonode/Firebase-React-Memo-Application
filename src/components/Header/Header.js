import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <h3>MEMO</h3>
        <div className="toggle" onClick={() => { this.props.navOpen() }}>&equiv;</div>
      </div>
    );
  }

}

export default Header;
