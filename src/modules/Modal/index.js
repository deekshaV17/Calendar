import React, { Component } from 'react';

import './modal.css';

class Modal extends Component {
  state = {
    desc: '',
  };

  handleChange = (field, value) => {
    this.setState({ [field]: value });
  };

  render() {
    const { close, addEvent} = this.props;
    const { desc } = this.state;
    return (
      <div>
        <div className="modal-wrapper">
          <div className="modal-header">
            <h3>Add Event</h3>
            <span className="close-modal-btn" onClick={close}>×</span>
          </div>
          <div className="modal-body">
            <label>Event Description: </label>
            <input
              className="modal-input"
              value={desc}
              placeholder="Description"
              onChange={(e) => this.handleChange('desc', e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="btn-cancel" onClick={close}>CLOSE</button>
            <button className="btn-continue" onClick={() => addEvent(this.state.desc)}>CONTINUE</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal;

