import React, { Component } from 'react';

import BigNewsCard from './cards/BigNewsCard';
import LoaderComponent from './components/LoaderComponent';

var qs = require('qs');

class PageOpenArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsCard: '',
      loading: true
    };
    this.updateContent = this.updateContent.bind(this);
  }

  updateContent() {
    this.setState({ loading: true });
    this.setState({ newsCard: '' });

    let obj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    let article_id = obj.id, source = obj.source;
    let requestedUrl = 'http://127.0.0.1:4000/getArticle?article_id=' + article_id + '&source=' + source;
    fetch(requestedUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({ loading: false });
          this.setState({
            newsCard:
              <BigNewsCard
                key={article_id}
                news={result[0]} />
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.updateContent();
  }

  render() {
    return (
      <div>
        {this.state.newsCard}
        <LoaderComponent loading={this.state.loading} />
      </div>
    )
  }
}

export default PageOpenArticle;
