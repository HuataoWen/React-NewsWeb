import React, { Component } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

import './index.css';

class PeopleCard extends Component {
  constructor(props) {
    super(props);
  }
  openCard() {
    console.log("event");
}
  render () {
    let { id, title, date, description } = this.props.news;
    return (
    <Card className="bigCard" onClick={() => this.props.openCard(id)}>
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
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
    )
  }
}

export default PeopleCard;