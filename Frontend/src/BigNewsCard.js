import React, { Component } from 'react';
import { Card} from 'react-bootstrap';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

class BigCard extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    let { id, title, date, description } = this.props.news;
    return (
    <Card className="bigCard">
      <Card.Title>{title}</Card.Title>
      
      <div>
      <span>{date}</span>
      <span>Facebook</span>
      <span>Twitter</span>
      <span>Email</span>
      <FaRegBookmark size={20} color='#ff0000' onClick={() => this.props.saveToBookmark(id)}/>
      </div>
      
      <Card.Img top='true'
          width="100%"
          src="https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png"
          alt="Card image cap"
          />
      
      <Card.Text>{description}</Card.Text>

      <div>
        <p>TODO: Comments</p>
      </div>
    </Card>
    )
  }
}

export default BigCard;
