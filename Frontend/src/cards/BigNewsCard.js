import React, { createRef, Component } from 'react';
import { Card } from 'react-bootstrap';
import { MdBookmark, MdBookmarkBorder, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import ReactTooltip from 'react-tooltip'
import smoothscroll from 'smoothscroll-polyfill';
import commentBox from 'commentbox.io';
import { toast } from 'react-toastify';

import './BigNewsCard.css';


class BigCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandIcon: MdExpandMore,
      inBookmark: false,
      ppos: 0,
      numLines: '9em',
      isExpand: false
    };

    this.myRef = React.createRef();
    this.expandCollapse = this.expandCollapse.bind(this);
    this.saveToBookmark = this.saveToBookmark.bind(this);
    this.removeFromBookmark = this.removeFromBookmark.bind(this);

    smoothscroll.polyfill();
  }

  expandCollapse() {
    if (this.state.expandIcon === MdExpandMore) {
      let pos = this.myRef.current.offsetTop;
      this.setState({ ppos: pos });
      this.setState({ numLines: '100%' });
      setTimeout(function () { window.scrollTo({ top: pos + 52, left: 0, behavior: 'smooth' }); }, 50);
      this.setState({ expandIcon: MdExpandLess });
    }
    else {
      window.scrollTo({ top: this.state.ppos - 92, left: 0, behavior: 'smooth' });
      setTimeout(function () { this.setState({ numLines: '9em' }); }.bind(this), 500);
      this.setState({ expandIcon: MdExpandMore });
    }
  }

  wrapper = createRef();
  componentDidMount() {
    let id = this.props.news.id;
    this.removeCommentBox = commentBox('5708029035020288-proj', { defaultBoxId: id });

    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
    if (bookmarkDB == null) {
      this.setState({ inBookmark: false });
    }
    else {
      let tmp = bookmarkDB.filter(function (item) { return item.id === id; });
      if (tmp.length === 0) this.setState({ inBookmark: false });
      else this.setState({ inBookmark: true });
    }

    const node = this.wrapper.current;
    var divHeight = node.offsetHeight / 24;
    if (divHeight < 6) this.setState({ isExpand: false });
    else this.setState({ isExpand: true });
    console.log('divHeight' + divHeight);
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  saveToBookmark(bookmarkInfo) {
    console.log(bookmarkInfo);

    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));

    if (bookmarkDB != null) bookmarkDB = [...bookmarkDB, bookmarkInfo];
    else bookmarkDB = [bookmarkInfo];
    console.log('here:' + JSON.stringify(bookmarkDB));
    localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));

    console.log("bookmarkDB:" + bookmarkDB);

    this.setState({ inBookmark: true });
    toast('Saving ' + bookmarkInfo.title, { containerId: 'A' });
  }

  removeFromBookmark(bookmarkInfo) {
    console.log(bookmarkInfo);

    let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
    bookmarkDB = bookmarkDB.filter(function (item) { return item.id !== bookmarkInfo.id; });
    localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));

    console.log("bookmarkDB:" + bookmarkDB);

    this.setState({ inBookmark: false });
    toast('Removing ' + bookmarkInfo.title, { containerId: 'A' });
  }

  render() {
    let { id, title, date, urlToImg, url, tags, description, source } = this.props.news;
    let bookmarkInfo = { id: id, title: title, urlToImg: urlToImg, url: url, date: date, tags: tags, source: source };

    return (
      <div>
        <Card className="bigCard">
          <strong><i>{title}</i></strong>

          <div className="d-flex">
            <div className="mr-auto p-2"><span><i>{date}</i></span></div>
            <div className="p-2">
              <a href="/#" data-tip data-for='facebookTooltip'>
                <FacebookShareButton
                  style={{ outline: 'none' }}
                  url={url}
                  hashtag='#CSCI_571NewsApp'
                  className="button"
                >
                  <FacebookIcon size={25} round={true} />
                </FacebookShareButton>
              </a>
              <ReactTooltip id='facebookTooltip' type='dark' place="top" effect="solid">
                <span>Facebook</span>
              </ReactTooltip>

              <a href="/#" data-tip data-for='twitterTooltip'>
                <TwitterShareButton
                  style={{ outline: 'none' }}
                  url={url}
                  via='#CSCI_571NewsApp'
                  className="button"
                >
                  <TwitterIcon size={25} round={true} />
                </TwitterShareButton>
              </a>
              <ReactTooltip id='twitterTooltip' type='dark' place="top" effect="solid">
                <span>Twitter</span>
              </ReactTooltip>

              <a href="/#" data-tip data-for='emailTooltip'>
                <EmailShareButton
                  style={{ outline: 'none' }}
                  url={url}
                  subject='#CSCI_571NewsApp'
                  className="button"
                >
                  <EmailIcon size={25} round={true} />
                </EmailShareButton>
              </a>
              <ReactTooltip id='emailTooltip' type='dark' place="top" effect="solid">
                <span>Email</span>
              </ReactTooltip>
            </div>

            <div className="p-2"></div>

            <div className="p-2">
              <button data-tip data-for='bookmarkTooltip2'>
                {this.state.inBookmark === true && <MdBookmark size={25} color='#ff0000' onClick={() => this.removeFromBookmark(bookmarkInfo)} />}
                {this.state.inBookmark === false && <MdBookmarkBorder size={25} color='#ff0000' onClick={() => this.saveToBookmark(bookmarkInfo)} />}
              </button>
              <ReactTooltip id='bookmarkTooltip2' type='dark' place="top" effect="solid">
                <span>Bookmark</span>
              </ReactTooltip>
            </div>
          </div>

          <div>
            <Card.Img top='true' width="100%" src={urlToImg} alt="Card image cap" />
          </div>

          <div>
            <Card.Text ref={this.wrapper} className="bigCardDes" style={{ maxHeight: this.state.numLines }}>{description}</Card.Text>
          </div>

          {this.state.isExpand === true &&
            <div className="d-flex justify-content-end" onClick={() => this.expandCollapse()} ref={this.myRef}>
              {<this.state.expandIcon size={25} />}
            </div>}

          <div className="commentbox" id={this.props.news.id}></div>
        </Card>

      </div>
    )
  }
}

export default BigCard;
