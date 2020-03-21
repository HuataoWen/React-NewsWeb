import React, { Component } from 'react';
import { Card, Row, Col, CardDeck } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';


class SmallCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { id, title, date, description } = this.props.news;
    let url = 'www.google.com';

    return (
      <Col lg="3">
        <Card className="smallCard">
          <strong><i>{title}</i><MdShare onClick={() => this.props.onOpenModal(title, url)}/></strong>
          
          <div  onClick={() => this.props.openCard(id)}>
            <Card.Img top='true'
            src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
            alt="Card image cap"
            />
            <div>
              <span><i>{date}</i></span>
              <span className="worldTag">WORLD</span>
              <span className="worldTag">BUSINESS</span>
            </div>
          </div>
        </Card>
      </Col>
    )
  }
}

export default SmallCard;
