import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './Nav.css';

class Nav extends Component {

  handleClickOutside = (e) => {
    const { visible, navClose } = this.props;

    if(!visible) return null;
    navClose();
  }


  render() {
    const { visible,children } = this.props;
    return (
      <div className="navwrapper">
        <ReactCSSTransitionGroup
          transitionName="nav"
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

export default onClickOutside(Nav);
