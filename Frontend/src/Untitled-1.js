import React from "react";
import { BrowserRouter as Router, Switch as RouterSwitch, Route, NavLink, useParams } from "react-router-dom";

import { Navbar, NavItem } from 'react-bootstrap';
import Select from 'react-select';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchKeyword: '',
      searchSuggestions: [],
      loadingSuggestions: false,
    }

    this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
    this.getSearchNews = this.getSearchNews.bind(this);

    this.switchPage = this.switchPage.bind(this);
  };

  getSearchSuggestions(keyword) {
    console.log('getSearchSuggestions() -> keyword:' + keyword);
    this.setState({ loadingSuggestions: true});
    
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

    this.setState({ loadingSuggestions: false});
    this.setState({searchSuggestions: localOptions});
  }

  getSearchNews(keyword) {
    console.log('getSearchNews() -> keyword:' + keyword);
  }

  switchPage(page) {
    console.log('switchPage() -> page:' + page);
  }

  render() {
    return (
      <Router>
        <div>
          {/* Navgation bar */}
          <div>
            <Navbar bg="dark" variant="dark" expand="md">
              {/* Search area */}
              <div style={{width: '250px', margin: '0 10px'}}>
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

              {/* Page area */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <NavItem><NavLink to="/home" className="pageInactive" activeClassName="pageActive">Home</NavLink></NavItem>
                <NavItem><NavLink to="/world" className="pageInactive" activeClassName="pageActive">World</NavLink></NavItem>
                <NavItem><NavLink to="/politics" className="pageInactive" activeClassName="pageActive">Politics</NavLink></NavItem>
                <NavItem><NavLink to="/business" className="pageInactive" activeClassName="pageActive">Business</NavLink></NavItem>
                <NavItem><NavLink to="/technology" className="pageInactive" activeClassName="pageActive">Technology</NavLink></NavItem>
                <NavItem><NavLink to="/sports" className="pageInactive" activeClassName="pageActive">Sports</NavLink></NavItem>
              
              </Navbar.Collapse>
            </Navbar>
          </div>

          <RouterSwitch>
            <Route path="/:page" component={<Child />}/>
          </RouterSwitch>
        </div>
      </Router>
    )
  }
}
function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { page } = useParams();

  return (
    <div>
      <h3>ID: {page}</h3>
    </div>
  );
}

export default App;
