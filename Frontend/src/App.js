import React from 'react';
import { BrowserRouter as Router, Route, Switch as RouterSwitch, NavLink, withRouter } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

//import ReactTooltip from 'react-tooltip'
import Pages from "./Pages"
import SearchPage from "./SearchPage"
import OpenArticle from "./OpenArticle"
import Favorites from "./Favorites"


import BookmarkComponent from "./BookmarkComponent"
import SourceSwitch from "./SourceSwitch"
import SearchBox from "./SearchBox"

var qs = require('qs');
const Bookmark = withRouter(BookmarkComponent);
const SourceSwitchComponent = withRouter(SourceSwitch);
const SearchBoxComponent = withRouter(SearchBox);
const PageswithRouter = withRouter(Pages);
const OpenArticleRouter = withRouter(OpenArticle);

//let NYT_SRC = false, GUARDIAN_SRC = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkDB: ['ss'],
      newsSource: true,
    };
  };

  render() {
    return (
      <div>
        <Router>
          <Navbar bg="dark" variant="dark" expand="md">

            <SearchBoxComponent />

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

              <Bookmark />

              <SourceSwitchComponent setNewsSource={(newsSource) => this.setState({ newsSource: newsSource })} />

            </Navbar.Collapse>
          </Navbar>

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

          <RouterSwitch>
            <Route exact path="/search" render={(props) => <SearchPage {...props} source={this.state.newsSource} />} />
            <Route exact path="/article" render={(props) => <OpenArticleRouter {...props} source={this.state.newsSource} />} />
            <Route exact path="/favorites" render={(props) => <Favorites {...props} source={this.state.newsSource} />} />
            <Route exact path="/(home|world|politics|business|technology|sports)/" render={(props) => <PageswithRouter {...props} source={this.state.newsSource} />} />
            <Route component={() => <h3>404 - Not found</h3>} />
          </RouterSwitch>
        </Router>
      </div>
    )
  }
}


const IndexPage = (props) => {
  //let page = props.match.params[0];

  //console.log(match);
  //console.log(page);
  //console.log(state.newsSource);

  /*
  let source;
  if (state.newsSource) source = 'Guardian';
  else source = 'NYTimes';

  let requestedUrl = 'http://127.0.0.1:4000/page/' + page + '-' + source;
  let resultCard;
  
  console.log("g:" + resultCard);
  const request = async () => {
    const response = await fetch(requestedUrl);
    const json = await response.json();
    console.log(json);
    resultCard = json;
    console.log("g:" + resultCard);
  }
  request();
  */
  //props.sayHello();
  //console.log("g:" + resultCard);

  return (<div>

    <h3>Favorites</h3>
  </div>);
};



function saveToBookmark(article) {
  let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
  if (bookmarkDB != null) bookmarkDB = [...bookmarkDB, { id: article, value: article }];
  else bookmarkDB = [{ id: article, value: article }];
  localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));
  console.log("bookmarkDB:" + bookmarkDB);
  toast('Saving ' + article, { containerId: 'A' });
}

function removeFromBookmark(article) {
  let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkDB"));
  bookmarkDB = bookmarkDB.filter(function (item) { return item.id !== article; });
  localStorage.setItem("bookmarkDB", JSON.stringify(bookmarkDB));
  console.log("bookmarkDB:" + bookmarkDB);
  toast('Removing ' + article, { containerId: 'A' });
}

function ShowArticle(props) {
  var obj = qs.parse(props.location.search, { ignoreQueryPrefix: true });
  console.log(props);

  return (
    <p>
      <strong>Article ID: </strong>
      {obj.id}
      <button onClick={() => saveToBookmark(obj.id)}>Add</button>
      <button onClick={() => removeFromBookmark(obj.id)}>Remove</button>
    </p>
  );
};

/*
function Favoritdes(props) {
  let bookmarkDB = JSON.parse(localStorage.getItem("bookmarkNews"));
  console.log(bookmarkDB);

  return (
    <p>
      <strong>Favorites: </strong>
      <button onClick={() => removeFromBookmark(44)}>Remove</button>
    </p>
  );
};
*/


export default App;
