import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';

import './MedianNewsCard.css';

var pageGroup = { 'world': 1, 'politics': 1, 'business': 1, 'technology': 1, 'sports': 1 };

class MedianNewsCard extends Component {
  render() {
    let { id, title, date, urlToImg, url, tags, description } = this.props.news;
    let tagsStyle;
    if (pageGroup[tags[0]] !== 1) tagsStyle = ['health'];
    else tagsStyle = tags;

    return (
      <div>
        <Card className="medianCard">
          <Row>
            <Col md="2" onClick={() => this.props.openCard(id)}>
              <Card.Img top='true'
                src={urlToImg}
                alt="Card image cap"
              />
            </Col>
            <Col>
              <strong><i>{title}</i><MdShare onClick={() => this.props.onOpenModal(title, url)} /></strong>
              <div onClick={() => this.props.openCard(id)}>
                <Card.Text className="medianCardDes">{description}</Card.Text>
                <span><i>{date}</i></span>
                <span className={tagsStyle[0] + "Tag"}>{tags[0].toUpperCase()}</span>
              </div>
            </Col>
          </Row>
        </Card>
        
      </div>
    )
  }
}

export default MedianNewsCard;
