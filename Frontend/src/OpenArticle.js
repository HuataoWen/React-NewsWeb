import React, { Component } from 'react';

import BigNewsCard from './BigNewsCard';
import Loader from './Loader';
import Modal from "react-responsive-modal";
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";

var qs = require('qs');

class OpenArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCard: '',
      loading: true,
      inBookmark: false
    };
    this.updateContent = this.updateContent.bind(this);
    this.saveToBookmark = this.saveToBookmark.bind(this);
    this.removeFromBookmark = this.removeFromBookmark.bind(this);
  }

  saveToBookmark(bookmarkInfo) {
    console.log(bookmarkInfo);
    
    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
    if (bookmarkDB != null)  bookmarkDB = [...bookmarkDB, { id: bookmarkInfo.id, content: bookmarkInfo.content }];
    else bookmarkDB = [{ id: bookmarkInfo.id, content: bookmarkInfo.content }];
    localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));
    console.log("bookmarkDB:" + bookmarkDB);
    //toast('Saving ' + bookmarkInfo.content.title, { containerId: 'A' });
  }

  removeFromBookmark(bookmarkInfo) {
    console.log(bookmarkInfo);
    
    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
    bookmarkDB = bookmarkDB.filter(function (item) { return item.id !== bookmarkInfo.id; });
    localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));
    console.log("bookmarkDB:" + bookmarkDB);
    //toast('Removing ' + bookmarkInfo.content.title, { containerId: 'A' });
    
  }

  updateContent() {
    this.setState({ loading: true });
    this.setState({ newsCard: '' });

    let obj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let article_id = obj.id, source = obj.source;
    let requestedUrl = 'http://127.0.0.1:4000/getArticle?article_id=' + article_id + '&source=' + source;

    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
    let tmp = bookmarkDB.filter(function (item) { return item.id === article_id; });
    console.log('-----------');
    console.log(bookmarkDB);
    if (tmp.length === 0) this.setState({ inBookmark: false });
    else this.setState({ inBookmark: true });

    fetch(requestedUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ loading: false });
          this.setState({
            newsCard:
              <BigNewsCard key={article_id}
                //saveToBookmark={this.saveToBookmark}
                //removeFromBookmark={this.removeFromBookmark}
                inBookmark={this.state.inBookmark}
                news={result[0]} />
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.updateContent();
  }

  render() {
    return (
      <div>
        {this.state.newsCard}
        <Loader loading={this.state.loading} />
      </div>
    )
  }
}

export default OpenArticle;
