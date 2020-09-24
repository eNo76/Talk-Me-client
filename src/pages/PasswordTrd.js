import React from "react";
import { withRouter } from "react-router-dom";
import "../css/PasswordTrd.css";
import lock from "../img/lock.png";
import check from "../img/check.png";

class PasswordTrd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
    };
  }
  // 뒤로가기 버튼 클릭 시 passwordsnd page로 이동
  backBtn() {
    this.props.history.push("/passwordsnd");
  }
  // state의 password를 입력받은 pssword로 변경
  changePassword(key, value) {
    this.setState({
      [key]: value,
    });
  }
  // save버튼 클릭 시 비밀번호 변경 API 요청 후 login page로 이동
  saveBtn() {
    let { newPassword, confirmPassword } = this.state;
    if (newPassword === confirmPassword) {
      fetch("/auth/pwinquiry/newpassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
        credentials: "include",
      })
        .then((res) => {
          if (res.ok) {
            alert("비밀번호가 정상적으로 변경되었습니다.");
            this.props.history.push("/login");
          } else {
            document.querySelector("#mobile").classList.add("wobble-horizontal")
            window.setTimeout(() => {
              document.querySelector("#mobile").classList.remove("wobble-horizontal")
            }, 1000);
          }
        })
        .catch((err) => console.log(err));
    } else {
      document.querySelector("#mobile").classList.add("wobble-horizontal")
      window.setTimeout(() => {
        document.querySelector("#mobile").classList.remove("wobble-horizontal")
      }, 1000);
    }
  }

  render() {
    return (
      <>
        <button className="NPWBack" onClick={() => this.backBtn()}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="PWTshootingStarAnimationBox">
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

        <div className="PWTrdInputBox">
          <input
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "Please Enter Your New Password")
            }
            placeholder="Please Enter Your New Password"
            className="NPWBOX"
            type="password"
            value={this.state.newPassword}
            onChange={(e) => this.changePassword("newPassword", e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.saveBtn();
                this.changePassword("newPassword", "");
                this.changePassword("confirmPassword", "");
                e.target.value = "";
              }
            }}
          ></input>
          <img id="lock" src={lock}></img>

          <input
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) =>
              (e.target.placeholder = "Please Confirm Your New Password")
            }
            placeholder="Please Confirm Your New Password"
            className="CPWBOX"
            type="password"
            value={this.state.confirmPassword}
            onChange={(e) =>
              this.changePassword("confirmPassword", e.target.value)
            }
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                this.saveBtn();
                this.changePassword("newPassword", "");
                this.changePassword("confirmPassword", "");
                e.target.value = "";
              }
            }}
          ></input>
          <img className="check" src={check}></img>
        </div>

        <div id="btnBox">
          <div
            id="PWTrdBtn"
            onClick={() => {
              this.saveBtn();
              this.changePassword("newPassword", "");
              this.changePassword("confirmPassword", "");
            }}
          >
            <div id="PWTrdSave">save</div>
          </div>
        </div>
      </>
    );
  }
}

export default withRouter(PasswordTrd);
