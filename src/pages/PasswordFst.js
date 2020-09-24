import React from "react";
import { withRouter } from "react-router-dom";
import "../css/PasswordFstAndSnd.css";
import mail from "../img/mail.png";

class PasswordFst extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      loading: false
    };
  }
  // 뒤로가기 버튼 클릭 시 login page로 이동
  backBtn() {
    this.props.handlingIsLogin("findPassword");
    this.props.history.push("/login");
  }
  // state의 key와 value를 입력 받아 변경
  changeState(key, value) {
    this.setState({
      [key]: value
    })
  }
  // send 버튼 클릭 시 secret key 발급 API 요청 후 passwordsnd page로 이동
  sendEmail() {
    this.changeState("loading", true);

    fetch("/auth/pwinquiry/askkey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          alert(
            "Secret key가 정상적으로 발송되었습니다. email을 확인해 주세요"
          );
          this.props.history.push("/passwordsnd");
        } else {
          this.changeState("loading", false);
          document.querySelector("#mobile").classList.add("wobble-horizontal")
          window.setTimeout(() => {
            document.querySelector("#mobile").classList.remove("wobble-horizontal")
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        {!this.state.loading ?
          <>
            <button className="passwordBack" onClick={() => this.backBtn()}>
              <i className="fas fa-arrow-left"></i>
            </button>
            <div className="PWshootingStarAnimationBox">
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
            <div id="PWText">Enter your email for new password</div>
            <div className="PWInputBox">
              <input
                onFocus={(e) => (e.target.placeholder = "")}
                onBlur={(e) => (e.target.placeholder = "Please Enter Your Email")}
                placeholder="Please Enter Your Email"
                id="EmailBOX"
                type="email"
                onChange={(e) => this.changeState("email", e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    this.sendEmail();
                    e.target.value = "";
                  }
                }}
              ></input>
              <img className="mail" src={mail}></img>
            </div>

            <div id="btnBox">
              <div id="PWBtn" onClick={() => this.sendEmail()}>
                <div id="PWBtnText">Send</div>
              </div>
            </div>
          </>
          :
          <div className="loadingAnimationBox">
            <div id="loadingStick1" className="loadingStick"></div>
            <div id="loadingStick2" className="loadingStick"></div>
            <div id="loadingStick3" className="loadingStick"></div>
            <div id="loadingStick4" className="loadingStick"></div>
            <div id="loadingStick5" className="loadingStick"></div>
          </div>}
      </>
    );
  }
}

export default withRouter(PasswordFst);
