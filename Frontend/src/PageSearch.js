import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import SmallNewsCard from './cards/SmallNewsCard';
import LoaderComponent from './components/LoaderComponent';

const SmallNewsCardRouter = withRouter(SmallNewsCard);
var qs = require('qs');

class PageSearch extends Component {
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
    let AWSIP = false;
    let requestedUrl;
    if (AWSIP) requestedUrl = 'http://ec2-3-133-141-163.us-east-2.compute.amazonaws.com:4000/search/' + keyWord + '-' + this.props.newsSource;
    else requestedUrl = 'http://127.0.0.1:4000/search/' + keyWord + '-' + this.props.newsSource;
    
    fetch(requestedUrl)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('--------------');
          console.log(result.length);
          this.setState({ loading: false });
          if (result.length === 0) {
            this.setState({
              newsCard:
                <div>
                  <h2 style={{ margin: '0 15px' }}>Results</h2>
                  <h4 style={{ margin: '0 15px' }}>No related results!</h4>
                </div>
            });
          }
          else {
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
          }
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
        <LoaderComponent loading={this.state.loading} />
      </div>
    )
  }
}

export default PageSearch;
