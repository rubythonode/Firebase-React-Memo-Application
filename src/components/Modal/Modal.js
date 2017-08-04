import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends Component {

  handleClickOutside = (e) => {
    const { visible, modalClose } = this.props;

    if(!visible) return null;
    modalClose();
  }
  render() {
    const { visible, children } = this.props;
    return (
      <div className="modalwrapper">
        <ReactCSSTransitionGroup
          transitionName="modal"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
        {
          visible && (
            <div className="modal">
              {children}
            </div>
          )
        }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

Modal.PropTypes = {
  visible: PropTypes.bool,
  modalClose: PropTypes.func
}

Modal.defaultProps = {
  visible: false,
  modalClose: () => { console.error('modalClose not defined') }
}

export default onClickOutside(Modal);
