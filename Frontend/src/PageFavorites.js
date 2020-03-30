import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Row } from 'react-bootstrap';

import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from "react-responsive-modal";
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";

import ReactTooltip from 'react-tooltip';

import SmallNewsCard from './cards/SmallNewsCard';

const SmallNewsCardRouter = withRouter(SmallNewsCard);

class PageFavorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCard: '',
      modalFlag: false,
      modalTitle: '',
      modalURL: ''
    };
    this.updateContent = this.updateContent.bind(this);
    this.removeFromBookmark = this.removeFromBookmark.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  removeFromBookmark(id, title) {
    console.log(id);

    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
    bookmarkDB = bookmarkDB.filter(function (item) { return item.id !== id; });
    localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));
    console.log("bookmarkDB:" + bookmarkDB);
    toast('Removing ' + title, { containerId: 'A' });
    this.updateContent();

  }

  updateContent() {
    ReactTooltip.hide();
    console.log('Favorites');

    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));

    if (bookmarkDB.length === 0) {
      this.setState({ newsCard: <div style={{ textAlign: 'center' }}><br/><h4>You have no saved articles</h4></div> })
    }
    else {
      console.log(bookmarkDB);
      this.setState({
        newsCard:
          <div><h2 style={{ margin: '0 15px' }}>Favorites</h2>
            <Row>
              {bookmarkDB.map(news => {
                return (
                  <SmallNewsCardRouter
                    key={news.id}
                    onOpenModal={this.onOpenModal.bind(this)}
                    removeFromBookmark={this.removeFromBookmark}
                    page='bookmark'
                    news={news} />)
              })}
            </Row>
          </div>
      });
    }
  }

  componentDidMount() {
    this.updateContent();
  }

  onOpenModal(title, url) {
    this.setState({ modalFlag: true });
    this.setState({ modalTitle: title });
    this.setState({ modalURL: url });
  };

  onCloseModal() {
    this.setState({ modalFlag: false });
  };

  render() {
    return (
      <div>
        {this.state.newsCard}
        <div>
          <Modal open={this.state.modalFlag} onClose={this.onCloseModal}>
            <h4>{this.state.modalTitle}&nbsp;&nbsp;&nbsp;&nbsp;</h4>
            <hr />
            <h4 className="d-flex justify-content-center">Share via</h4>
            <div className="d-flex justify-content-around">
              <FacebookShareButton style={{ outline: 'none' }}
                url={this.state.modalURL}
                quote={this.state.modalTitle}
                className="button"
              >
                <FacebookIcon size={50} round={true} />
              </FacebookShareButton>

              <TwitterShareButton style={{ outline: 'none' }}
                url={this.state.modalURL}
                quote={this.state.modalTitle}
                className="button"
              >
                <TwitterIcon size={50} round={true} />
              </TwitterShareButton>

              <EmailShareButton style={{ outline: 'none' }}
                url={this.state.modalURL}
                quote={this.state.modalTitle}
                className="button"
              >
                <EmailIcon size={50} round={true} />
              </EmailShareButton>
            </div>
          </Modal>
        </div>
      </div>
    )
  }
}

export default PageFavorites;
