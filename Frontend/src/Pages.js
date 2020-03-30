import React, { Component } from 'react';
import Modal from "react-responsive-modal";
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";

import MedianNewsCard from './cards/MedianNewsCard';
import LoaderComponent from './components/LoaderComponent';


class Pages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCard: '',
      loading: true,
      modalFlag: false,
      modalTitle: '',
      modalURL: ''
    };
    this.updateContent = this.updateContent.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  openCard(id) {
    this.props.history.push('/article?id=' + id + '&source=' + this.props.source);
  }

  updateContent() {
    this.setState({ loading: true });
    this.setState({ newsCard: '' });

    
    let requestedUrl = 'http://127.0.0.1:4000/page/' + this.props.match.params[0] + '-' + this.props.source;
    console.log(requestedUrl);
    fetch(requestedUrl)
      .then(response => response.json())
      .then(result => {
        this.setState({ loading: false });
        
        this.setState({
          newsCard: result.map(news => {
            return (
              <div style={{ margin: "0 0 20px 0" }} key={news.id}>
                <MedianNewsCard
                  openCard={this.openCard.bind(this)}
                  onOpenModal={this.onOpenModal}
                  news={news} />
              </div>
            )
          })
        });
      });
  }

  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params[0] !== this.props.match.params[0] ||
      prevProps.source !== this.props.source) {
      this.updateContent();
    }
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
        <LoaderComponent loading={this.state.loading} />
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

export default Pages;
