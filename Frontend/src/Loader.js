import React, { Component } from 'react';
import BounceLoader from "react-spinners/BounceLoader";

class Loader extends Component {

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <BounceLoader
            css={'margin: 200px auto 0 auto'}
            size={25}
            color={"#123abc"}
            loading={this.props.loading}
          />
          {this.props.loading === true && <span >Loading</span>}
        </div>
      </div>
    )
  }
}

export default Loader;
