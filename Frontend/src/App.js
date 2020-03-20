import React from 'react';
import ReactDOM from 'react-dom';

import { Navbar, Nav, NavItem, NavLink, Container, Row, Col, Card, CardColumns, CardDeck} from 'react-bootstrap';
import Select from 'react-select';
import Switch from "react-switch";
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import { FaBookmark, FaRegBookmark, IoMdShare, IoMdTrash } from 'react-icons/fa';
import { SocialIcon } from 'react-social-icons';
import Modal from "react-responsive-modal";


import MedianNewsCard from './MedianNewsCard';
import SmallNewsCard from './SmallNewsCard';
import BigNewsCard from './BigNewsCard';


let NYT_SRC = false, GUARDIAN_SRC = true;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchWord: 'lll',
        options: [],
        activePage: 'Home',
        bookmarkIcon: FaRegBookmark,
        newsSource: NYT_SRC,
        newsCard: [],
        open: false,
        news: [
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
            },
            {
              id: 5,
              title: "James Jameson",
              date: "2020-03-27",
              description: "Met at a party. Will connect with later"
            },
            {
              id: 6,
              title: "James Jameson",
              date: "2020-03-27",
              description: "Met at a party. Will connect with later"
            },
            {
              id: 7,
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

        // 3. Update news cards
        this.setState({newsCard:
            <div><h2 style={{margin: '0 15px'}}>Results</h2>
                <Row>
                    {this.state.news.map(news => {
                        return ( <SmallNewsCard key={news.id} openCard={this.openCard.bind(this)} news={news} /> )
                    })}
                </Row>    
            </div>
        });
        //this.setState({bookmarkIcon: FaRegBookmark});
        // TODO
    }

    switchPage(data) {
        // 1. Get page
        let page = data;
        console.log("switchPage -> Page: " + page);

        this.setState({newsCard : this.state.news.map(news => {
            return (
                <div style={{margin: "0 0 20px 0"}} key={news.id}>
                    <MedianNewsCard openCard={this.openCard.bind(this)} news={news} />
                </div>)
            })});


        // 2. Update news cards
        this.setState({searchWord: null});
        this.setState({activePage: page});
        this.setState({bookmarkIcon: FaRegBookmark});
        // TODO
    }

    goBookmarkPage() {
        this.setState({bookmarkIcon: FaBookmark});
        this.setState({newsCard: <p>Bookmark Page</p>});

        this.setState({newsCard:
            <div><h2 style={{margin: '0 15px'}}>Favorites</h2>
                <Row>
                    {this.state.news.map(news => {
                        return ( <SmallNewsCard key={news.id} openCard={this.openCard.bind(this)} news={news} /> )
                    })}
                </Row>    
            </div>
        });
        console.log("Enter bookmark age");
    }
    
    switchNewsSource(newsSource) {
        this.setState({ newsSource: newsSource });
        console.log("switchNewsSource -> News Source:" + newsSource);
    }

    saveToBookmark(id) {
        alert(id);
    }

    openCard(id) {
        console.log("id:" + id);
        this.setState({newsCard:
            <BigNewsCard key={1} saveToBookmark={this.saveToBookmark.bind(this)} news={this.state.news[id]} />
        });
    }


    onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };


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
            
            <div>{this.state.newsCard}</div>

            <button onClick={this.onOpenModal}>Open modal</button>
        <Modal open={this.state.open} onClose={this.onCloseModal}>
          <h2>Simple centered modal</h2>
          <FacebookShareButton
                url={'www.baidu.com'}
                quote={'title'}
                className="button" 
                >
                <SocialIcon url="http://jaketrent.com" network="facebook" />
              </FacebookShareButton>
              <TwitterShareButton
                url={'www.baidu.com'}
                quote={'title'}
                className="button" 
                >
                <SocialIcon url="http://jaketrent.com" network="twitter" />
              </TwitterShareButton>
              <EmailShareButton
                url={'www.baidu.com'}
                quote={'title'}
                className="button" 
                >
                <SocialIcon url="http://jaketrent.com" network="email" />
              </EmailShareButton>
        </Modal>

        </div>
        );
    }
}

export default App;