import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

import './SmallNewsCard.css';

var pageGroup = { 'world': 1, 'politics': 1, 'business': 1, 'technology': 1, 'sports': 1 };

class SmallCard extends Component {
  constructor(props) {
    super(props);
    this.openCard = this.openCard.bind(this);
  }

  openCard(id, source) {
    this.props.history.push('/article?id=' + id + '&source=' + source);
  }

  render() {
    let id = this.props.news.id;
    let title = this.props.news.title;
    let date = this.props.news.date;
    let urlToImg = this.props.news.urlToImg;
    let url = this.props.news.url;
    let tags = this.props.news.tags;
    let source = this.props.news.source;
    let sourceTag;
    if (source === 'true') sourceTag = 'guardian';
    else sourceTag = 'nytimes';
    let tagsStyle;
    if (pageGroup[tags[0]] !== 1) tagsStyle = ['health'];
    else tagsStyle = tags;

    return (
      <Col lg="3">
        <Card className="smallCard" onClick={() => this.openCard(id, source)}>
          <strong>
            <i>{title}</i>
            <MdShare onClick={(e) => this.props.onOpenModal(e, title, url)} />
            {this.props.page === 'bookmark' && <MdDelete onClick={(e) => this.props.removeFromBookmark(e, id, title)}></MdDelete>}
          </strong>

          <div>
            <Card.Img top='true'
              src={urlToImg}
              alt="Card image cap"
            />
            <div>
              <span><i>{date}</i></span>
              {this.props.page === 'bookmark' && <span key={sourceTag} className={sourceTag + 'Tag'}>{sourceTag.toUpperCase()}</span>}
              <span className={tagsStyle[0] + "Tag"}>{tags[0].toUpperCase()}</span>
            </div>
          </div>
        </Card>
      </Col>
    )
  }
}

export default SmallCard;
