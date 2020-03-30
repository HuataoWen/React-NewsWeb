import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Shop from './components/Shop';
import Error from './components/Error';

const users = [
  {
    name: 'Param',
  },
  {
    name: 'Vennila',
  },
  {
    name: 'Afrin',
  },
];

const UsersPage = () => {
  return (
    <>
      <h3>Users Page</h3>
      {users.map((user, index) => (
        <h5 key={index}>
          <Link to={`/user/${index + 1}`}>{user.name}'s Page</Link>
        </h5>
      ))}
    </>
  );
};

const UserPage = ({ match, location }) => {
  const { params: { userId } } = match;

  return (
    <>
      <p>
        <strong>User ID: </strong>
        {userId}
      </p>
      <p>
        <strong>User Name: </strong>
        {users[userId - 1].name}
      </p>
    </>
  );
};

const IndexPage = () => {
  return (
    <h3>Home Page</h3>
  );
};

const AboutPage = () => {
  return (
    <h3>About Page</h3>
  );
};

const SearchPage = ({ match, location }) => {
  return (
    <p>
      <strong>Query Params: </strong>
      {location.search}
    </p>
  );
};


const NoMatchPage = () => {
  return (
    <h3>404 - Not found</h3>
  );
};
const PropsPage = ({ title }) => {
  return (
    <h3>{title}</h3>
  );
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Test'
    }
    this.change = this.change.bind(this);
  };
  change() {
    this.setState({title: 'changed'})
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <h1 onClick={this.change}>change</h1>
        <Router>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/users">Users</Link>
          <Link to="/search?q=react">Search</Link>
          <Link to="/404-not-found">404</Link>
          <Link to="/props">Passing Props</Link>
          <Link to="/props-through-component">props-through-component</Link>
          <Link to="/props-through-render">Props through render</Link>
          <Switch>
            <Route exact path="/" component={IndexPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route exact path="/user/:userId" component={UserPage} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/props" component={PropsPage} />
            <Route exact path="/props-through-component" component={() => <PropsPage title={'Props through component'} />} />
            <Route exact path="/props-through-render" render={(props) => <PropsPage {...props} title={this.state.title} />} />
            <Route component={NoMatchPage} />
          </Switch>
          
        </Router>
        <a href="/about">about with browser reload</a>
      </div>
    )
  }
}


export default App;
