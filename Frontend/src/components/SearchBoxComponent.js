import React, { Component } from "react";
import Select from 'react-select';

class SearchBoxComponent extends Component {
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

    let debug = false;

    if (debug) {
      this.setState({ searchSuggestions: [{ value: keyword, label: keyword }] });
      this.setState({ loadingSuggestions: false });
    }
    else {
      if (keyword !== '') {
        localOptions.push({ value: keyword, label: keyword });
        fetch('https://xiaobudai.cognitiveservices.azure.com/bing/v7.0/suggestions?mkt=en-US&q=' + keyword, {
          headers: {
            "Ocp-Apim-Subscription-Key": "8cfdb72a5dfe44ba94f7d66f8a598f0a"
          }
        })
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.error === undefined) {
              let resultsRaw = result.suggestionGroups[0].searchSuggestions;
              let results = resultsRaw.map(result => (result.displayText));
              for (var i = 0; i < results.length; i++) {
                localOptions.push({ value: results[i], label: results[i] });
              }
              console.log(localOptions);
              this.setState({ loadingSuggestions: false });
              this.setState({ searchSuggestions: localOptions });
            }
          },
            (error) => {
              console.log(error);
            });
      }
      else {
        console.log('getSearchSuggestions -> keyword is empty');
        this.setState({ loadingSuggestions: false });
      }
    }
  }

  getSearchNews(keyword) {
    this.setState({ loadingSuggestions: false });
    console.log('getSearchNews() -> keyword:' + keyword.value);
    this.setState({ searchKeyword: keyword });
    this.props.history.push('/search?q=' + keyword.value);
  }

  render() {
    if (this.props.location.pathname.substring(0, 7) !== '/search') {
      return (
        <div style={{ width: '250px', marginRight: '10px'}}>
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

export default SearchBoxComponent;
