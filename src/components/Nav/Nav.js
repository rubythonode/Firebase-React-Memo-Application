import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import './Nav.css';

class Nav extends Component {

  handleClickOutside = (e) => {
    const { visible, navClose } = this.props;

    if(!visible) return null;
    navClose();
  }


  render() {
    const { visible, children } = this.props;
    return (
      <div className="navwrapper">
        <ReactCSSTransitionGroup
          transitionName="slider"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {
          visible && (
            <div className="nav">
              {children}
            </div>
          )
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}


Nav.PropTypes = {
  visible: PropTypes.bool
}

Nav.defaultProps = {
  visible: false,
  navClose: () => { console.error('navClose not defined') }
}

export default onClickOutside(Nav);
