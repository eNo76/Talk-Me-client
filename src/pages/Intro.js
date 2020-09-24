import React from "react";
import { withRouter } from "react-router-dom";
import "../css/Intro.css";

class Intro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div id="introShootingStarAnimationBox">
          <div className="shootingStarAnimation">
            <i id="star" className="fas fa-star fa-lg">
              <div id="bigStarBack"></div>
            </i>
            <div className="allSatellite s1"></div>
            <div className="allSatellite s2"></div>
            <div className="allSatellite s3"></div>
            <div className="allSatellite s4"></div>
            <div className="allSatellite s5"></div>
            <div className="meteor"></div>
            <div className="meteor s6"></div>
            <div className="meteor s7"></div>
            <div className="meteor s8"></div>
          </div>
        </div>
        <div id="introBtnBox">
          <div id="guestBtn" onClick={() => {
            this.props.handlingIsLogin("isGuest");
            this.props.history.push("/createroom");
          }}>
            <div id="guestText">GUEST</div>
          </div>
          <div id="loginBtn" onClick={() => {
            this.props.history.push("/login");
          }}>
            <div id="loginText">LOGIN</div>
          </div>
          <div id="signupBtn" onClick={() => {
            this.props.history.push("/signup");
          }}>
            <div id="signupText">signup</div>
            <div id="signupLine"></div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Intro);
