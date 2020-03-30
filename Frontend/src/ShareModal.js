import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";


class SmallCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal open={this.props.state.modalFlag} onClose={this.onCloseModal}>
          <h4>{this.props.state.modalTitle} | {this.props.state.modalTitle}&nbsp;&nbsp;&nbsp;</h4>
          <hr />
          <h4 className="d-flex justify-content-center">Share via</h4>
          <div className="d-flex justify-content-around">
            <FacebookShareButton style={{ outline: 'none' }}
              url={this.props.state.modalURL}
              quote={this.props.state.modalTitle}
              className="button"
            >
              <FacebookIcon size={50} round={true} />
            </FacebookShareButton>

            <TwitterShareButton style={{ outline: 'none' }}
              url={this.props.state.modalURL}
              quote={this.props.state.modalTitle}
              className="button"
            >
              <TwitterIcon size={50} round={true} />
            </TwitterShareButton>

            <EmailShareButton style={{ outline: 'none' }}
              url={this.props.state.modalURL}
              quote={this.props.state.modalTitle}
              className="button"
            >
              <EmailIcon size={50} round={true} />
            </EmailShareButton>
          </div>
        </Modal>
      </div>
    )
  }
}

export default SmallCard;
