import React from "react";
import { withRouter } from "react-router-dom";
import "../css/PasswordFstAndSnd.css";
import key from "../img/key.png";

class PasswordSnd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      secretKey: "",
    };
  }
  // 뒤로가기 버튼 클릭 시 passwordfst page로 이동
  backBtn() {
    this.props.history.push("/passwordfst");
  }
  // state의 secretkey를 입력받은 secretkey로 변경
  changeSecretKey(key) {
    this.setState({
      secretKey: key,
    });
  }
  // submit 버튼 클릭 시 입력한 secret key가 일치하는지 확인하는 API 요청 후 passwordtrd page로 이동
  submitSecretKey() {
    fetch("/auth/pwinquiry/comparekey", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secretKey: this.state.secretKey,
      }),
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) {
          this.props.history.push("/passwordtrd");
        } else {
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
        <div id="PWText">
          Enter the secret key
          <br />
          written in the email you recieved.
        </div>

        <div className="PWInputBox">
          <input
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "Please Enter Your Secret Key")
            }
            placeholder="Please Enter Your Secret Key"
            id="SecretKeyBOX"
            type="text"
            onChange={(e) => this.changeSecretKey(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.submitSecretKey();
                e.target.value = "";
              }
            }}
          ></input>
          <img className="key" src={key}></img>
        </div>

        <div id="btnBox">
          <div id="PWBtn" onClick={() => this.submitSecretKey()}>
            <div id="PWBtnText">Submit</div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(PasswordSnd);
