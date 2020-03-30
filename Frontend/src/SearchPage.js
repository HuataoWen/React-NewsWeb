import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import SmallNewsCard from './SmallNewsCard';
import Loader from './Loader';

const SmallNewsCardRouter = withRouter(SmallNewsCard);
var qs = require('qs');

class SearchPage extends Component {
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

    var obj = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });

    // 1. Get keyword
    let keyWord = obj.q;
    console.log("getNews -> Search word:" + keyWord);

    // 2. Fetch news
    let requestedUrl = 'http://127.0.0.1:4000/search/' + keyWord + '-' + this.props.newsSource;
    fetch(requestedUrl)
      .then(res => res.json())
      .then(
        (result) => {
          
          console.log(result);
          this.setState({ loading: false });
          this.setState({
            newsCard:
              <div><h2 style={{ margin: '0 15px' }}>Results</h2>
                <Row>
                  {result.map(news => {
                    return (<SmallNewsCardRouter key={news.id}
                      page='search'
                      news={news} />)
                  })}
                </Row>
              </div>
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

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps);
    console.log(this.props);
    if (prevProps.location.search !== this.props.location.search) {
      this.updateContent();
    }
  }

  render() {
    return (
      <div>
        {this.state.newsCard}
        <Loader loading={this.state.loading} />
      </div>
    )
  }
}

export default SearchPage;
