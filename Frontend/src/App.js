import React from 'react';

import { Navbar, Nav, NavItem, NavLink, Row, Container} from 'react-bootstrap';
import Select from 'react-select';
import Switch from "react-switch";
import { FacebookIcon, TwitterIcon, EmailIcon, FacebookShareButton, TwitterShareButton, EmailShareButton } from "react-share";
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import ReactTooltip from 'react-tooltip'
import { ToastContainer, toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Modal from "react-responsive-modal";
import BounceLoader from "react-spinners/BounceLoader";

import MedianNewsCard from './MedianNewsCard';
import SmallNewsCard from './SmallNewsCard';
import BigNewsCard from './BigNewsCard';


let NYT_SRC = false, GUARDIAN_SRC = true;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { searchWord: 'lll',
        options: [],
        activePage: 'home',
        bookmarkIcon: MdBookmarkBorder,
        newsSource: NYT_SRC,
        showSourceSwitch: true,
        newsCard: [],
        modalFlag: false,
        modalTitle: '',
        modalURL: '',
        bookmarkNews: [],
        loading: true,
        news: []
    };
        
        this.getSearchSuggestion = this.getSearchSuggestion.bind(this);
        this.getNews = this.getNews.bind(this);

        this.switchPage = this.switchPage.bind(this);
        this.goBookmarkPage = this.goBookmarkPage.bind(this);
        this.switchNewsSource = this.switchNewsSource.bind(this);
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        

    }

    componentDidMount() {
        // 1. Load local storage
        let tmp = localStorage.getItem("newsSource");
        if (tmp != null) {
            if (tmp === "true") { this.setState({newsSource: GUARDIAN_SRC}); }
            else { this.setState({newsSource: NYT_SRC}); }
        }
        
        tmp = JSON.parse(localStorage.getItem("bookmarkNews"));
        if (tmp != null) { this.setState({bookmarkNews: tmp}); }

        setTimeout(
            function() {
                this.switchPage(this.state.activePage);
            }
            .bind(this),
            500
        );
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
        this.setState({newsCard: ''});
        this.setState({loading: true});
        this.setState({activePage: ''});
        this.setState({showSourceSwitch: false});
        this.setState({bookmarkIcon: MdBookmarkBorder});

        window.scrollTo(0, 0);
        // 1. Get keyword
        let keyWord = data.value;
        this.setState({searchWord: keyWord.value});
        console.log("getNews -> Search word:" + keyWord);

        // 2. Fetch news
        let requestedUrl = 'http://127.0.0.1:4000/search/' + keyWord + '-' + this.state.newsSource;
        fetch(requestedUrl)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({news: result});

                setTimeout(
                    function() {
                        this.setState({loading: false});
                        this.setState({newsCard:
                            <div><h2 style={{margin: '0 15px'}}>Results</h2>
                                <Row>
                                    {this.state.news.map(news => {
                                        return ( <SmallNewsCard key={news.id} openCard={this.openCard.bind(this)} news={news} /> )
                                    })}
                                </Row>
                            </div>
                        });
                    }
                    .bind(this),
                    500
                );
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }

    switchPage(page) {
        this.setState({newsCard: ''});
        this.setState({showSourceSwitch: true});
        this.setState({loading: true});
        this.setState({searchWord: null});
        this.setState({activePage: page});
        this.setState({bookmarkIcon: MdBookmarkBorder});

        window.scrollTo(0, 0);
        // 1. Get page

        let requestedUrl = 'http://127.0.0.1:4000/page/' + page + '-' + this.state.newsSource;
        console.log("switchPage -> Page: " + page);

        fetch(requestedUrl)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({news: result});

                setTimeout(
                    function() {
                        this.setState({loading: false});
                        this.setState({newsCard : this.state.news.map(news => {
                            return (
                                <div style={{margin: "0 0 20px 0"}} key={news.id}>
                                    <MedianNewsCard
                                    openCard={this.openCard.bind(this)}
                                    onOpenModal={this.onOpenModal.bind(this)}
                                    news={news} />
                                </div>
                            )
                        })});
                    }
                    .bind(this),
                    100
                );
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }

    goBookmarkPage() {
        window.scrollTo(0, 0);
        this.setState({bookmarkIcon: MdBookmark});
        this.setState({searchWord: null});
        this.setState({activePage: ''});
        this.setState({showSourceSwitch: false});
        ReactTooltip.hide();

        this.setState({newsCard:
            <div><h2 style={{margin: '0 15px'}}>Favorites</h2>
                <Row>
                    {this.state.bookmarkNews.map(news => {
                        return (
                        <SmallNewsCard
                        key={news.id}
                        openCard={this.openCard.bind(this)}
                        onOpenModal={this.onOpenModal.bind(this)}
                        removeFromBookmark={this.removeFromBookmark.bind(this)}
                        page='bookmark'
                        news={news} /> )
                    })}
                </Row>    
            </div>
        });
        console.log(this.state.newsCard)
        console.log("Enter bookmark age");
    }
    
    switchNewsSource(newsSource) {
        this.setState({ newsSource: newsSource });
        console.log("switchNewsSource -> News Source:" + newsSource);
        localStorage.setItem("newsSource", newsSource);
        if (this.state.activePage != '') {
            setTimeout(
                function() {
                    this.switchPage(this.state.activePage);
                }
                .bind(this),
                100
            );
        }

        // Update newsCard
    }

    saveToBookmark(id) {
        this.setState({bookmarkNews: [...this.state.bookmarkNews, this.state.news[id]]});
        toast('Saving ' + this.state.news[id].title, {containerId: 'A'});
        setTimeout(
            function() {
                localStorage.setItem("bookmarkNews", JSON.stringify(this.state.bookmarkNews));
            }
            .bind(this),
            500
        );
        localStorage.setItem("bookmarkNews", this.state.bookmarkNews);
    }

    removeFromBookmark(id, url, fromPage) {
        this.setState({bookmarkNews: this.state.bookmarkNews.filter(function(item) { 
            return item.url !== url;
        })});
        
        if (fromPage === 'bookmarkPage') {
            setTimeout(
                function() {
                    localStorage.setItem("bookmarkNews", JSON.stringify(this.state.bookmarkNews));
                    this.setState({newsCard:
                        <div><h2 style={{margin: '0 15px'}}>Favorites</h2>
                            <Row>
                                {this.state.bookmarkNews.map(news => {
                                    return (
                                    <SmallNewsCard
                                    key={news.id}
                                    openCard={this.openCard.bind(this)}
                                    onOpenModal={this.onOpenModal.bind(this)}
                                    removeFromBookmark={this.removeFromBookmark.bind(this)}
                                    page='bookmark'
                                    news={news} /> )
                                })}
                            </Row>
                        </div>
                    });
                }
                .bind(this),
                500
            );
        }
        toast('Removing ' + this.state.news[id].title, {containerId: 'A'});
    }

    openCard(id, article_id) {
        this.setState({newsCard: ''});
        this.setState({loading: true});
        this.setState({showSourceSwitch: true});
        this.setState({searchWord: null});
        this.setState({activePage: ''});
        this.setState({bookmarkIcon: MdBookmarkBorder});


        
        window.scrollTo(0, 0);
        
        let requestedUrl = 'http://127.0.0.1:4000/getArticle?article_id=' + article_id + '&source=' + this.state.newsSource;

        fetch(requestedUrl)
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
                this.setState({news: result});

                setTimeout(
                    function() {
                        this.setState({loading: false});

                        this.setState({newsCard:
                            <BigNewsCard key={1}
                            saveToBookmark={this.saveToBookmark.bind(this)}
                            removeFromBookmark={this.removeFromBookmark.bind(this)}
                            inBookmark={this.state.bookmarkNews.some(item => id === item.id)}
                            news={this.state.news[0]} />
                        });
                    }
                    .bind(this),
                    1000
                );
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
        )
    }
    
    onOpenModal(title, url) {
        this.setState({ modalFlag: true });
        this.setState({ modalTitle: title });
        this.setState({ modalURL: url });
    };
    
    onCloseModal() {
        this.setState({ modalFlag: false });
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
                        <Nav
                        className="mr-auto"
                        activeKey={this.state.activePage}
                        onSelect={this.switchPage}>
                            <NavItem><NavLink style={{ outline: 'none'}} eventKey="home">Home</NavLink></NavItem>
                            <NavItem><NavLink style={{ outline: 'none'}} eventKey="world">World</NavLink></NavItem>
                            <NavItem><NavLink style={{ outline: 'none'}} eventKey="politics">Politics</NavLink></NavItem>
                            <NavItem><NavLink style={{ outline: 'none'}} eventKey="business">Business</NavLink></NavItem>
                            <NavItem><NavLink style={{ outline: 'none'}} eventKey="technology">Technology</NavLink></NavItem>
                            <NavItem><NavLink style={{ outline: 'none'}} eventKey="sports">Sports</NavLink></NavItem>
                        </Nav>

                        <div>
                            <a data-tip data-for='bookmarkTooltip'>
                                {<this.state.bookmarkIcon size={25} className="bookmarkPos" color='#ffffff' onClick={this.goBookmarkPage}/>}
                            </a>
                            <ReactTooltip id='bookmarkTooltip' type='dark' place="bottom" effect="solid">
                                <span>Bookmark</span>
                            </ReactTooltip>
                        </div>

                        {this.state.showSourceSwitch === true && <div><h3 className="switchTag">NYTimes&nbsp;&nbsp;</h3></div>}
                        {this.state.showSourceSwitch === true &&
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
                        {this.state.showSourceSwitch === true && <div><h3 className="switchTag">Guardian</h3></div>}
                    </Navbar.Collapse>
                </Navbar>
            </div>
            
            <div>{this.state.newsCard}</div>
            
            <div>
            <Modal open={this.state.modalFlag} onClose={this.onCloseModal}>
                <h4>{this.state.modalTitle} | {this.state.modalTitle}&nbsp;&nbsp;&nbsp;</h4>
                <hr/>
                <h4 className="d-flex justify-content-center">Share via</h4>
                <div className="d-flex justify-content-around">
                    <FacebookShareButton style={{ outline: 'none'}}
                    url={this.state.modalURL}
                    quote={this.state.modalTitle}
                    className="button" 
                    >
                        <FacebookIcon size={50} round={true} />
                    </FacebookShareButton>

                    <TwitterShareButton style={{ outline: 'none'}}
                    url={this.state.modalURL}
                    quote={this.state.modalTitle}
                    className="button" 
                    >
                        <TwitterIcon size={50} round={true} />
                    </TwitterShareButton>
                    
                    <EmailShareButton style={{ outline: 'none'}}
                    url={this.state.modalURL}
                    quote={this.state.modalTitle}
                    className="button" 
                    >
                        <EmailIcon size={50} round={true} />
                    </EmailShareButton>
                </div>
            </Modal>

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
            <div style={{textAlign: 'center'}}>
                <BounceLoader
                css={'margin: 200px auto 0 auto'}
                size={25}
                color={"#123abc"}
                loading={this.state.loading}
                />
                {this.state.loading === true && <span >Loading</span>}
            </div>
            
            

            </div>
        </div>
        );
    }
}

export default App;