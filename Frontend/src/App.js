import React from "react";

import { Navbar, Nav, NavItem, Row, Container} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    NavLink
} from "react-router-dom";

// Params are placeholders in the URL that begin
// with a colon, like the `:id` param defined in
// the route in this example. A similar convention
// is used for matching dynamic segments in other
// popular web frameworks like Rails and Express.

export default function App() {
  return (
    <Router>
      <div>
        <h2>Accounts</h2>

        <NavItem><NavLink to="/home" style={{ outline: 'none'}} eventKey="home">Home</NavLink></NavItem>
        <NavItem><NavLink to="/world" style={{ outline: 'none'}} eventKey="world">World</NavLink></NavItem>
        <NavItem><NavLink to="/politics" style={{ outline: 'none'}} eventKey="politics">Politics</NavLink></NavItem>
        <NavItem><NavLink to="/business" style={{ outline: 'none'}} eventKey="business">Business</NavLink></NavItem>
        <NavItem><NavLink to="/technology" style={{ outline: 'none'}} eventKey="technology">Technology</NavLink></NavItem>
        <NavItem><NavLink to="/sports" style={{ outline: 'none'}} eventKey="sports">Sports</NavLink></NavItem>

      </div>
    </Router>
  );
}
