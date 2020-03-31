import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';

import './MedianNewsCard.css';

class MedianNewsCard extends Component {
  render() {
    let { id, title, date, urlToImg, url, tags, description } = this.props.news;

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
                {tags.map((value, index) => {
                  return <span key={index} className={value + "Tag"}>{value.toUpperCase()}</span>
                })}
              </div>
            </Col>
          </Row>
        </Card>
        
      </div>
    )
  }
}

export default MedianNewsCard;
