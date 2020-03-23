import React, { Component } from 'react';
import { Card, Col } from 'react-bootstrap';
import { MdShare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';

class SmallCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { id, title, date, urlToImg, url, tags, description } = this.props.news;

    return (
      <Col lg="3">
        <Card className="smallCard">
          <strong>
            <i>{title}</i>
            <MdShare onClick={() => this.props.onOpenModal(title, url)}/>
            {this.props.page === 'bookmark' && <MdDelete onClick={() => this.props.removeFromBookmark(id, url, 'bookmarkPage')}></MdDelete>}
          </strong>
          
          <div  onClick={() => this.props.openCard(id)}>
            <Card.Img top='true'
            src={urlToImg}
            alt="Card image cap"
            />
            <div>
              <span><i>{date}</i></span>
              {tags.map((value, index) => {
                return <span className={value+"Tag"}>{value.toUpperCase()}</span>
              })}
            </div>
          </div>
        </Card>
      </Col>
    )
  }
}

export default SmallCard;
