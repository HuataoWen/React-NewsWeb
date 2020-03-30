import React, { Component } from "react";
import Select from 'react-select';

class SearchBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchKeyword: '',
      searchSuggestions: [],
      loadingSuggestions: false,
    }

    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
    this.getSearchNews = this.getSearchNews.bind(this);
  }

  getSearchSuggestions(keyword) {
    console.log('getSearchSuggestions() -> keyword:' + keyword);
    this.setState({ loadingSuggestions: true });

    let localOptions = [];

    if (keyword !== '') {
      // TODO:: suggestion api
      let i;
      for (i = 0; i < 40; i++) {
        localOptions.push({ value: keyword, label: keyword });
      }
    }
    else {
      console.log('getSearchSuggestions -> keyword is empty');
    }

    this.setState({ loadingSuggestions: false });
    this.setState({ searchSuggestions: localOptions });
  }

  getSearchNews(keyword) {
    console.log('getSearchNews() -> keyword:' + keyword.value);
    this.setState({ searchKeyword: keyword });
    this.props.history.push('/search?q=' + keyword.value);
    //this.setState({searchKeyword: this.props.state.searchValue});
    //this.setState({searchKeyword: {label: keyword.label}});
  }

  render() {
    if (this.props.location.pathname.substring(0, 7) !== '/search') {
      return (
        <div style={{ width: '250px', marginRight: '10px' }}>
          <Select
            to="/search"
            isLoading={this.state.loadingSuggestions}
            value={''}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            options={this.state.searchSuggestions}
            onChange={this.getSearchNews}
            onInputChange={this.getSearchSuggestions}
            placeholder={"Enter keyword .."}
          />
        </div>
      );
    }
    else {
      return (
        <div style={{ width: '250px', marginRight: '10px' }}>
          <Select
            to="/search"
            isLoading={this.state.loadingSuggestions}
            value={this.state.searchKeyword}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            options={this.state.searchSuggestions}
            onChange={this.getSearchNews}
            onInputChange={this.getSearchSuggestions}
            placeholder={"Enter keyword .."}
          />
        </div>
      );
    }


  }
}

export default SearchBox;
