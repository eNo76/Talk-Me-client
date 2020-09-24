import React from "react";
import { withRouter } from "react-router-dom";
import "../css/LoginAndSignup.css";
import lock from "../img/lock.png";
import mail from "../img/mail.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handlingInputValue(key, e) {
    this.setState({ [key]: e.target.value });
  }

  handlingUserInformation() {
    const { email, password } = this.state;
    const { handlingIsLogin } = this.props;
    //입력받은 값을 바탕으로 포스트 요청
    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      credentials: "include",
    })
      //response의 상태코드가 200이면 App의 state변경 메소드 실행
      .then((res) => {
        if (res.status === 200) {
          handlingIsLogin("isLogin");
          this.props.history.push("/roomlist");
        } else {
          document.querySelector("#mobile").classList.add("wobble-horizontal");
          window.setTimeout(() => {
            document
              .querySelector("#mobile")
              .classList.remove("wobble-horizontal");
          }, 1000);
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <button className="signBack" onClick={() => this.props.history.push("/intro")}>
          <i className="fas fa-arrow-left"></i>
        </button >
        <div className="newShootingStarAnimationBox1">
          <div className="shootingStarAnimation loginShootingStar">
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
        <div className="signInputBox">
          <input
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "Please Enter Your ID"}
            placeholder="Please Enter Your ID"
            className="IDBOX"
            type="text"
            onChange={(e) => this.handlingInputValue("email", e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.handlingUserInformation();
                e.target.value = "";
              }
            }}
          ></input>
          <img className="mail" src={mail}></img>
          <input
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "Please Enter Your Password"}
            placeholder="Please Enter Your Password"
            className="PWBOX"
            type="password"
            onChange={(e) => this.handlingInputValue("password", e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.handlingUserInformation();
                e.target.value = "";
              }
            }}>
          </input>
          <img className="lock" src={lock}></img>
        </div>
        <div className="signBox">
          <div
            id="forgotBtn"
            onClick={() => {
              this.props.handlingIsLogin("findPassword");
              this.props.history.push("/passwordfst");
            }}
          >
            forgot password
          </div>
          <div
            className="newLoginBtn"
            onClick={() => this.handlingUserInformation()}
          >
            <div className="newLoginText">LOGIN</div>
          </div>
          <div
            className="socialLoginBtn"
            onClick={() =>
              (window.location.href =
                "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=573943257082-7st2e4102s4unen44o7794ooiimbm97u.apps.googleusercontent.com&scope=openid%20profile%20email&redirect_uri=http://localhost:4000/auth/social")
            }
          >
            <div className="socialLoginText"> Continue with Google</div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(Login);
