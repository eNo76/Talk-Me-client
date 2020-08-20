import React from "react";
import { withRouter } from "react-router-dom";
import "../css/PasswordSnd.css";

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
          alert("Secret Key가 일치하지 않습니다.");
        }
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <button id="passwordBack" onClick={() => this.backBtn()}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="shootingStarAnimationBox">
          <div className="shootingStarAnimation">
            <div className="star"></div>

            <div id="PWSndText">
              Enter the secret key
              <br />
              written in the email you recieved.
            </div>
          </div>
        </div>

        <div className="PWSndInputBox">
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
                this.handlingUserInformation();
                e.target.value = "";
              }
            }}
          ></input>
        </div>

        <div id="btnBox">
          <div id="PWSndBtn" onClick={() => this.submitSecretKey()}>
            <div id="PWSndSubmit">Submit</div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(PasswordSnd);
