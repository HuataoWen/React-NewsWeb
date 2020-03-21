import React, { Component } from 'react';
import { Card} from 'react-bootstrap';
import { MdBookmark, MdBookmarkBorder, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import ReactTooltip from 'react-tooltip'
import smoothscroll from 'smoothscroll-polyfill';


class BigCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expandIcon: MdExpandMore,
      expandPos: 0,
      
      numLines: '9em'};
    this.myRef = React.createRef();
    
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    smoothscroll.polyfill();
  }
  collapse() {
    this.setState({ numLines: '9em' });
  }
  expand() {
    
    if (this.state.expandIcon === MdExpandMore) {
      let pos = this.myRef.current.offsetTop + 52;
      this.setState({ expandIcon: MdExpandLess });
      this.setState({ numLines: '100%' });
      setTimeout(function(){ window.scrollTo({top: pos, left: 0, behavior: 'smooth'}); }, 50);
    }
    else {
      window.scrollTo({top: 600, left: 0, behavior: 'smooth'});
      this.setState({ expandIcon: MdExpandMore });
      setTimeout(() => { this.collapse() }, 500);
    }
  }

  render () {
    let { id, title, date, description } = this.props.news;
    let url = 'www.google.com';

    return (
    <Card className="bigCard">
      <strong><i>{title}</i></strong>
      
      <div className="d-flex">
        <div className="mr-auto p-2"><span>{date}</span></div>
        <div className="p-2">
          <a data-tip data-for='facebookTooltip'>
            <FacebookShareButton style={{ outline: 'none'}}
            url={url}
            quote={title}
            className="button" 
            >
                <FacebookIcon size={25} round={true} />
            </FacebookShareButton>
          </a>
          <ReactTooltip id='facebookTooltip' type='dark' place="top" effect="solid">
              <span>Facebook</span>
          </ReactTooltip>

          <a data-tip data-for='twitterTooltip'>
            <TwitterShareButton style={{ outline: 'none'}}
            url={url}
            quote={title}
            className="button" 
            >
                <TwitterIcon size={25} round={true} />
            </TwitterShareButton>
          </a>
          <ReactTooltip id='twitterTooltip' type='dark' place="top" effect="solid">
              <span>Twitter</span>
          </ReactTooltip>

          <a data-tip data-for='emailTooltip'>
            <EmailShareButton style={{ outline: 'none'}}
            url={url}
            quote={title}
            className="button" 
            >
                <EmailIcon size={25} round={true} />
            </EmailShareButton>
          </a>
          <ReactTooltip id='emailTooltip' type='dark' place="top" effect="solid">
              <span>Twitter</span>
          </ReactTooltip>
        </div>

        <div className="p-2"></div>

        <div className="p-2">
          <a data-tip data-for='bookmarkTooltip2'>
            <MdBookmarkBorder size={25} color='#ff0000' onClick={() => this.props.saveToBookmark(id)}/>
          </a>
          <ReactTooltip id='bookmarkTooltip2' type='dark' place="top" effect="solid">
              <span>Bookmark</span>
          </ReactTooltip>
        </div>
      </div>
      
      <Card.Img top='true'
        width="100%"
        src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
        alt="Card image cap"/>
      
      <div>
        <Card.Text className="bigCardDes" style={{maxHeight: this.state.numLines}}>Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I took the question, and would like the answer to be)Since you're the author of a library doing this, and op asked on the how to do this in a react way, without library. (that's how I too</Card.Text>
        </div>

      <div className="d-flex justify-content-end" onClick={() => this.expand()} ref={this.myRef}>
        {<this.state.expandIcon size={25}/>}
      </div>
      
      <div>
        <p>TODO: Comments</p>
      </div>

    </Card>
    )
  }
}

export default BigCard;
