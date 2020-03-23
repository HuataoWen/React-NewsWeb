import React, { Component } from 'react';
import { Card} from 'react-bootstrap';
import { MdBookmark, MdBookmarkBorder, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import ReactTooltip from 'react-tooltip'
import smoothscroll from 'smoothscroll-polyfill';
import commentBox from 'commentbox.io';

class BigCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandIcon: MdExpandMore,
      expandPos: 0,
      inBookmark: this.props.inBookmark,
      ppos:0,
      numLines: '9em'};
      
    this.myRef = React.createRef();
    this.expandCollapse = this.expandCollapse.bind(this);
    this.processBookmark = this.processBookmark.bind(this);
    smoothscroll.polyfill();
  }

  expandCollapse() {
    if (this.state.expandIcon === MdExpandMore) {
      let pos = this.myRef.current.offsetTop;
      this.setState({ ppos: pos });
      this.setState({ numLines: '100%' });
      setTimeout(function(){ window.scrollTo({top: pos + 52, left: 0, behavior: 'smooth'}); }, 50);
      this.setState({ expandIcon: MdExpandLess });
    }
    else {
      window.scrollTo({top: this.state.ppos - 92, left: 0, behavior: 'smooth'});
      setTimeout(
        function() {
          this.setState({numLines: '9em' });
        }
        .bind(this),
        500
      );
      this.setState({ expandIcon: MdExpandMore });
    }
  }

  componentDidMount() {
    this.removeCommentBox = commentBox('5708029035020288-proj', { defaultBoxId: this.props.news.id });
  }

  componentWillUnmount() {
    this.removeCommentBox();
  }

  processBookmark(id, url) {
    if (this.state.inBookmark === false) {
      this.props.saveToBookmark(id, 'detailPage');
      this.setState({inBookmark: true});
    }
    else {
      this.props.removeFromBookmark(id, url, 'detailPage');
      this.setState({inBookmark: false});
    }
  }

  render () {
    let { id, title, date, urlToImg, url, tags, description } = this.props.news;

    return (
      <Card className="bigCard">
        <strong><i>{title}</i></strong>

        <div className="d-flex">
          <div className="mr-auto p-2"><span>{date}</span></div>
          <div className="p-2">
            <a data-tip data-for='facebookTooltip'>
              <FacebookShareButton style={{ outline: 'none'}} url={url} quote={title} className="button">
                <FacebookIcon size={25} round={true} />
              </FacebookShareButton>
            </a>
            <ReactTooltip id='facebookTooltip' type='dark' place="top" effect="solid">
                <span>Facebook</span>
            </ReactTooltip>

            <a data-tip data-for='twitterTooltip'>
              <TwitterShareButton style={{ outline: 'none'}} url={url} quote={title} className="button">
                <TwitterIcon size={25} round={true} />
              </TwitterShareButton>
            </a>
            <ReactTooltip id='twitterTooltip' type='dark' place="top" effect="solid">
                <span>Twitter</span>
            </ReactTooltip>

            <a data-tip data-for='emailTooltip'>
              <EmailShareButton style={{ outline: 'none'}} url={url} quote={title} className="button">
                <EmailIcon size={25} round={true} />
              </EmailShareButton>
            </a>
            <ReactTooltip id='emailTooltip' type='dark' place="top" effect="solid">
              <span>Email</span>
            </ReactTooltip>
          </div>

          <div className="p-2"></div>

          <div className="p-2">
            <a data-tip data-for='bookmarkTooltip2'>
              {this.state.inBookmark === true && <MdBookmark size={25} color='#ff0000' onClick={() => this.processBookmark(id, url)}/>}
              {this.state.inBookmark === false && <MdBookmarkBorder size={25} color='#ff0000' onClick={() => this.processBookmark(id, url)}/>}
            </a>
            <ReactTooltip id='bookmarkTooltip2' type='dark' place="top" effect="solid">
              <span>Bookmark</span>
            </ReactTooltip>
          </div>
        </div>

        <div>
          <Card.Img top='true' width="100%" src={urlToImg} alt="Card image cap"/>
        </div>

        <div>
          <Card.Text className="bigCardDes" style={{maxHeight: this.state.numLines}}>{description}</Card.Text>
        </div>

        {description.length >= 200 &&
        <div className="d-flex justify-content-end" onClick={() => this.expandCollapse()} ref={this.myRef}>
          {<this.state.expandIcon size={25}/>}
        </div>}
        
        <div className="commentbox" id={this.props.news.id}></div>
      </Card>
    )
  }
}

export default BigCard;
