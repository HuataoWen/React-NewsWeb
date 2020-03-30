import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

class SmallCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tmp: ''
    };
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

    return (
      <Col lg="3">
        <Card className="smallCard">
          <strong>
            <i>{title}</i>
            <MdShare onClick={() => this.props.onOpenModal(title, url)} />
            {this.props.page === 'bookmark' && <MdDelete onClick={() => this.props.removeFromBookmark(id, title)}></MdDelete>}
          </strong>

          <div onClick={() => this.openCard(id, source)}>
            <Card.Img top='true'
              src={urlToImg}
              alt="Card image cap"
            />
            <div>
              <span><i>{date}</i></span>
              {this.props.page === 'bookmark' && <span key={source} className={sourceTag + 'Tag'}>{source.toUpperCase()}</span>}
              {tags.map((value, index) => {
                return (
                  <span key={value} className={value + "Tag"}>{value.toUpperCase()}</span>
                )
              })}
            </div>
          </div>
        </Card>
      </Col>
    )
  }
}

export default SmallCard;
