import React from 'react';
import Switch from "react-switch";

let NYT_SRC = false, GUARDIAN_SRC = true;

class SourceSwitchComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsSource: true
    };
    this.switchNewsSource = this.switchNewsSource.bind(this);
  };

  componentDidMount() {
    let tmp = localStorage.getItem("newsSource");
    
    if (tmp != null) {
      if (tmp === "true") tmp = GUARDIAN_SRC;
      else tmp = NYT_SRC;
    }
    else {
      tmp = GUARDIAN_SRC;
    }
    
    this.setState({ newsSource: tmp });
    this.props.setNewsSource(tmp);
  }

  switchNewsSource(newsSource) {
    localStorage.setItem("newsSource", newsSource);
    this.setState({ newsSource: newsSource });
    this.props.setNewsSource(newsSource);
  }

  render() {
    if (this.props.location.pathname === '/favorites') return null;
    if (this.props.location.pathname.substring(0, 8) === '/article') return null;
    if (this.props.location.pathname.substring(0, 7) === '/search') return null;
    return (
      <>
        <div><h2 className="switchTag">NYTimes&nbsp;&nbsp;</h2></div>
        <div>
          <label>
            <Switch className="switchPos"
              onChange={this.switchNewsSource}
              checked={this.state.newsSource}
              uncheckedIcon
              checkedIcon
              width={52}
              height={22}
              offColor="#cbcacb"
              onColor="#0386ed" />
                      &nbsp;&nbsp;
                    </label>
        </div>
        <div><h2 className="switchTag">Guardian</h2></div>
      </>
    )
  }
}

export default SourceSwitchComponent;
