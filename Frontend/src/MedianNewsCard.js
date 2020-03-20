import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

class NewsCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { id, title, date, description } = this.props.news;
    return (
    <Card className="medianCard" onClick={() => this.props.openCard(id)}>
      <Row className="no-gutters">
        <Col md="2">
          <Card.Img top='true'
          width="100%"
          src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          alt="Card image cap"
          />
        </Col>                    
        
        <Col md="10">
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <span>{date}</span>
            <span className="worldTag">WORLD</span>
            <span className="businessTag">BUSINESS</span>
          </Card.Body>
        </Col>
      </Row>
    </Card>
    )
  }
}

export default NewsCard;
