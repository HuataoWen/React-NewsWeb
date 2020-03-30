import React from 'react';
import { Link } from 'react-router-dom';

import ReactTooltip from 'react-tooltip'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';

class BookmarkComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: MdBookmarkBorder
        };
    };
    
    render() {
        if (this.props.location.pathname === '/favorites')
        {
            return (
                <>
                   <div>
                    <Link to="/favorites" data-tip="Bookmark">
                      {<MdBookmark size={25} className="bookmarkPos" color='#ffffff' />}
                    </Link>
                    <ReactTooltip type='dark' place="bottom" effect="solid" />
                  </div>
                </>
            )
        }
        else {
            return (
                <>
                   <div>
                    <Link to="/favorites" data-tip="Bookmark">
                      {<MdBookmarkBorder size={25} className="bookmarkPos" color='#ffffff' />}
                    </Link>
                    <ReactTooltip type='dark' place="bottom" effect="solid" />
                  </div>
                </>
            )
        }
        
    }
}

export default BookmarkComponent;
