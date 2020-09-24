import React from "react";
import { withRouter } from "react-router-dom";
import "../css/Main.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="loadingAnimationBox">
          <div id="loadingStick1" className="loadingStick"></div>
          <div id="loadingStick2" className="loadingStick"></div>
          <div id="loadingStick3" className="loadingStick"></div>
          <div id="loadingStick4" className="loadingStick"></div>
          <div id="loadingStick5" className="loadingStick"></div>
        </div>
        <div id="mainStartBtn" onClick={() => {
          this.props.history.push("/intro");
        }}>
          <div id="mainStartText">start</div>
        </div>
      </>
    );
  }
}

export default withRouter(Main);

