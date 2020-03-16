import React from 'react'; 
import { Navbar, Nav, NavItem, NavLink, Form, FormControl, Button } from 'react-bootstrap';
import Select from 'react-select';
import Switch from "react-switch";
import './App.css';
const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const App = (props) => {
  handleChange(checked) {
    this.setState({ checked });
  }
  return (
    
    <div>
      <Navbar bg="dark" variant="dark" expand="md">
        <div style={{width: '300px'}}>
          <Select
        name="colors"
        className="basic-multi-select"
        classNamePrefix="select"
        options={options}
        placeholder="Enter keyword .."
      />
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
    
    
      
      <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" navbar>
            <NavItem><NavLink href="/components/">Home</NavLink></NavItem>
            <NavItem><NavLink href="/components/">World</NavLink></NavItem>
            <NavItem><NavLink href="/components/">Politics</NavLink></NavItem>
            <NavItem><NavLink href="/components/">Business</NavLink></NavItem>
            <NavItem><NavLink href="/components/">Technology</NavLink></NavItem>
            <NavItem><NavLink href="/components/">Sports</NavLink></NavItem>

            <label>
        <span>Switch with default style</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
          </Nav>
          
        </Navbar.Collapse>

        
      </Navbar>
    </div>
  );
}

export default App;
