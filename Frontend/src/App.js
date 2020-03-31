import React from 'react';
import { BrowserRouter as Router, Route, Switch as RouterSwitch, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Pages from "./Pages"
import PageSearch from "./PageSearch"
import PageOpenArticle from "./PageOpenArticle"
import PageFavorites from "./PageFavorites"
import BookmarkComponent from "./components/BookmarkComponent"
import SourceSwitchComponent from "./components/SourceSwitchComponent"
import SearchBoxComponent from "./components/SearchBoxComponent"


const BookmarkComponentRouter = withRouter(BookmarkComponent);
const SourceSwitchComponentRouter = withRouter(SourceSwitchComponent);
const SearchBoxComponentRouter = withRouter(SearchBoxComponent);
const PageswithRouter = withRouter(Pages);
const PageOpenArticleRouter = withRouter(PageOpenArticle);

let NYT_SRC = false;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsSource: NYT_SRC
    };
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark" expand="md">

            <SearchBoxComponentRouter />

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

              <Nav className="mr-auto">
                <NavItem style={{ margin: '5px', marginLeft: '0' }}><NavLink to="/home" className="pageInactive" activeClassName="pageActive">Home</NavLink></NavItem>
                <NavItem style={{ margin: '5px', marginLeft: '0' }}><NavLink to="/world" className="pageInactive" activeClassName="pageActive">World</NavLink></NavItem>
                <NavItem style={{ margin: '5px', marginLeft: '0' }}><NavLink to="/politics" className="pageInactive" activeClassName="pageActive">Politics</NavLink></NavItem>
                <NavItem style={{ margin: '5px', marginLeft: '0' }}><NavLink to="/business" className="pageInactive" activeClassName="pageActive">Business</NavLink></NavItem>
                <NavItem style={{ margin: '5px', marginLeft: '0' }}><NavLink to="/technology" className="pageInactive" activeClassName="pageActive">Technology</NavLink></NavItem>
                <NavItem style={{ margin: '5px', marginLeft: '0' }}><NavLink to="/sports" className="pageInactive" activeClassName="pageActive">Sports</NavLink></NavItem>
              </Nav>

              <BookmarkComponentRouter />

              <SourceSwitchComponentRouter setNewsSource={(newsSource) => this.setState({ newsSource: newsSource })} />

            </Navbar.Collapse>
          </Navbar>

          <RouterSwitch>
            <Route exact path="/search" render={(props) => <PageSearch {...props} source={this.state.newsSource} />} />
            <Route exact path="/article" render={(props) => <PageOpenArticleRouter {...props} source={this.state.newsSource} />} />
            <Route exact path="/favorites" render={(props) => <PageFavorites {...props} source={this.state.newsSource} />} />
            <Route exact path="/(home|world|politics|business|technology|sports)/" render={(props) => <PageswithRouter {...props} source={this.state.newsSource} />} />
            <Route component={() => <div style={{ textAlign: 'center' }}><br/><h3>404 - Not found</h3></div>} />
          </RouterSwitch>
        </Router>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          transition={Zoom}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    )
  }
}

export default App;
