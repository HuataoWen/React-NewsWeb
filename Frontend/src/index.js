import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav, NavItem, NavLink, Row, Col, Card, Button} from 'react-bootstrap';
import Select from 'react-select';
import Switch from "react-switch";
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import MediamNewsCard from './MediamNewsCard';

let NYT_SRC = false, GUARDIAN_SRC = true;
let newsCard;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchWord: 'lll', options: [], activePage: 'Home', bookmarkIcon: FaRegBookmark, newsSource: NYT_SRC,
        people: [
            {
              id: 1,
              title: "David Davidson",
              date: "2020-03-27",
              description: "Met at a party. Will connect with later"
            },
            {
              id: 2,
              title: "Mark Markson",
              date: "2020-03-27",
              description: "Met at a party. Will connect with later"
            },
            {
              id: 3,
              title: "Judy Judyson",
              date: "2020-03-27",
              description: "Met at a party. Will connect with later"
            },
            {
              id: 4,
              title: "James Jameson",
              date: "2020-03-27",
              description: "Met at a party. Will connect with later"
            }
          ]};
        
        this.getSearchSuggestion = this.getSearchSuggestion.bind(this);
        this.getNews = this.getNews.bind(this);

        this.switchPage = this.switchPage.bind(this);
        this.goBookmarkPage = this.goBookmarkPage.bind(this);
        this.switchNewsSource = this.switchNewsSource.bind(this);
    }

    getSearchSuggestion(data) {
        // 1. Get key word
        let keyWord = data;
        
        // 2. Fetch suggestion json file
        let i, options = [];
        if (keyWord !== '') {
            console.log('getSearchSuggestion -> Key word: ' + keyWord);
            
            
            // TODO:: suggestion api
            for (i = 0; i < 4; i++) {
                options.push({ value: data, label: data });
            }
        }
        else {
            console.log('getSearchSuggestion -> Key word is empty');
        }

        // 3.Update file
        this.setState({options: options});
    }
    
    getNews(data) {
        // 1. Get keyword
        let keyWord = data.value;
        this.setState({searchWord: keyWord.value});
        console.log("getNews -> Search word:" + keyWord);

        // 2. Fetch news
        // TODO

        // 3. Update news cardS
        //this.setState({bookmarkIcon: FaRegBookmark});
        // TODO
    }

    switchPage(data) {
        // 1. Get page
        let page = data;
        console.log("switchPage -> Page: " + page);

        newsCard = this.state.people.map(news => {
            return (
                <div style={{margin: "0 0 20px 0"}} key={news.id}>
                    <MediamNewsCard openCard={this.openCard.bind(this)} news={news} />
                </div>)
            })


        // 2. Update news cards
        this.setState({searchWord: null});
        this.setState({activePage: page})
        this.setState({bookmarkIcon: FaRegBookmark});
        // TODO
    }

    goBookmarkPage() {
        this.setState({bookmarkIcon: FaBookmark});
        newsCard = <p>No Result</p>;
        

        console.log("Enter bookmark age");
    }
    
    switchNewsSource(newsSource) {
        this.setState({ newsSource: newsSource });
        console.log("switchNewsSource -> News Source:" + newsSource);
    }

    openCard(id) {
        console.log(id);
        //this.setState({ people: this.state.people.filter(person => person.id !== id)});
      }

    render() {
        
        return (
        <div>
            <div>
                <Navbar bg="dark" variant="dark" expand="md">
                    <div style={{width: '250px'}}>
                        <Select
                        value={this.state.searchWord}
                        name="colors"
                        className="basic-multi-select"
                        classNamePrefix="select"
                        options={this.state.options}
                        onChange={this.getNews}
                        onInputChange={this.getSearchSuggestion}
                        placeholder={"Enter keyword .."}
                        />
                        
                    </div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto"
                        activeKey={this.state.activePage}
                        onSelect={this.switchPage}>
                            <NavItem><NavLink eventKey="Home">Home</NavLink></NavItem>
                            <NavItem><NavLink eventKey="World">World</NavLink></NavItem>
                            <NavItem><NavLink eventKey="Politics">Politics</NavLink></NavItem>
                            <NavItem><NavLink eventKey="Business">Business</NavLink></NavItem>
                            <NavItem><NavLink eventKey="Technology">Technology</NavLink></NavItem>
                            <NavItem><NavLink eventKey="Sports">Sports</NavLink></NavItem>
                        </Nav>

                        <div>{<this.state.bookmarkIcon size={20} className="bookmarkPos" color='#ffffff' onClick={this.goBookmarkPage}/>}</div>

                        {this.state.bookmarkIcon === FaRegBookmark && <div><h3 className="switchTag">NYTimes&nbsp;&nbsp;</h3></div>}
                        {this.state.bookmarkIcon === FaRegBookmark &&
                        <label>
                            <Switch className="switchPos"
                            onChange={this.switchNewsSource}
                            checked={this.state.newsSource}
                            uncheckedIcon
                            checkedIcon
                            width={52}
                            height={22}
                            offColor="#cbcacb"
                            onColor="#0386ed"/>
                            &nbsp;&nbsp;
                        </label>}
                        {this.state.bookmarkIcon === FaRegBookmark && <div><h3 className="switchTag">Guardian</h3></div>}
                    </Navbar.Collapse>
                </Navbar>
            </div>
            
            {newsCard}
            
        </div>
        );
    }
}


// 1. Local storage
// TODO

// 2. Render
ReactDOM.render(<App />, document.getElementById('root'));

