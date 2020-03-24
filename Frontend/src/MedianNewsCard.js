import React, { Component } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';

class NewsCard extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    let { id, title, date, urlToImg, url, tags, description, source, article_id } = this.props.news;
    
    return (
    <Card className="medianCard">
      <Row>
        <Col md="2" onClick={() => this.props.openCard(id, article_id)}>
          <Card.Img top='true'
          src={urlToImg}
          alt="Card image cap"
          />
        </Col>
        <Col>
          <strong><i>{title}</i><MdShare onClick={() => this.props.onOpenModal(title, url)}/></strong>
          <div onClick={() => this.props.openCard(id, article_id)}>
            <Card.Text className="medianCardDes">{description}</Card.Text>
            <span><i>{date}</i></span>
            {tags.map((value, index) => {
              return <span key={index} className={value+"Tag"}>{value.toUpperCase()}</span>
            })}
          </div>
        </Col>
      </Row>
    </Card>
    )
  }
}

export default NewsCard;
