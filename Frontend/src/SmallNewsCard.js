import React, { Component } from 'react';
import { Card, Row, Col, CardDeck } from 'react-bootstrap';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import { FaBookmark, FaRegBookmark, IoMdShare, IoMdTrash } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';



class SmallCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { id, title, date, description } = this.props.news;
    return (
      <Col lg="3">
      <Card className="smallCard" onClick={() => this.props.openCard(id)}>
      <strong>{title}</strong>

      <button id="myBtn">Open Modal</button>

<div id="myModal" class="modal">


  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>

      <FacebookShareButton
                url={'www.baidu.com'}
                quote={title}
                className="button" 
                >
                <SocialIcon url="http://jaketrent.com" network="facebook" />
              </FacebookShareButton>
              <TwitterShareButton
                url={'www.baidu.com'}
                quote={title}
                className="button" 
                >
                <SocialIcon url="http://jaketrent.com" network="twitter" />
              </TwitterShareButton>
              <EmailShareButton
                url={'www.baidu.com'}
                quote={title}
                className="button" 
                >
                <SocialIcon url="http://jaketrent.com" network="email" />
              </EmailShareButton>
      <Card.Img top='true'
      src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
      alt="Card image cap"
      />
      <div>
      <span>{date}</span>
      <span className="worldTag">WORLD</span>
      <span className="worldTag">BUSINESS</span>
      </div>
      
    </Card>
      </Col>
      
      
      
    )
  }
}

export default SmallCard;
