import React from "react";
import Question from "../component/Question";
import { withRouter } from "react-router-dom";
import "../css/CreateAndUpdate.css";

class CreateRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      questions: [],
      descByte: 0,
    };
  }
  // 뒤로가기 클릭 시 intro page로 이동
  backBtn() {
    if (this.props.isLogin) {
      this.props.history.push("/roomlist");
    } else {
      this.props.handlingIsLogin("isGuest");
      this.props.history.push("/intro");
    }
  }
  // state의 key와 value를 입력받아 변경
  changeState(key, value) {
    this.setState({
      [key]: value,
    });
  }
  // state.questions 배열에 id와 question을 객체 형태로 추가
  addQuestion(value) {
    let { questions } = this.state;

    let question = {
      id: questions.length ? questions[questions.length - 1].id + 1 : 0,
      text: value,
    };

    questions.push(question);

    this.setState({
      questions: questions,
    });
  }
  // id를 입력 받아 해당 id를 key로 가지는 질문 삭제
  deleteQuestion(id) {
    let questions = this.state.questions.filter((question) => {
      if (question.id !== id) {
        return question;
      }
    });
    this.setState({
      questions: questions,
    });
  }
  // event target을 입력 받아 value의 byte 수를 return
  byteCheck(target) {
    let byte = 0;
    target.value.split("").forEach((char) => {
      if (char.charCodeAt(0) <= 0x00007f) {
        byte = byte + 1;
      } else if (char.charCodeAt(0) <= 0x00ffff) {
        byte = byte + 2;
      }
    });
    if (target.id === "descBox") {
      this.setState({
        descByte: byte,
      });
    }
    return byte;
  }
  // 질문의 id값을 순서대로 재할당 후 chttingroom에 title과 questions를 보내고 이동
  startBtn() {
    if (this.state.title && this.state.questions.length) {
      let count = 0;
      let questions = this.state.questions.reduce(
        (arr, cur) => {
          cur.id = count;
          count++;
          arr[0].push(cur);
          arr[1].push(cur.text);
          return arr;
        },
        [[], []]
      );

      if (this.props.isLogin) {
        // 유저일 때
        fetch("/room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.state.title,
            description: this.state.description,
            questions: questions[1],
          }),
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            this.props.history.push({
              pathname: "/chattingroom",
              id: data.room.id,
            });
          })
          .catch((err) => console.log(err));
      } else {
        // 게스트일 때
        this.props.history.push({
          pathname: "/chattingroom",
          title: this.state.title,
          questions: questions[0],
        });
      }
    } else if (!this.state.title) {
      document.querySelector("#mobile").classList.add("wobble-horizontal")
      window.setTimeout(() => {
        document.querySelector("#mobile").classList.remove("wobble-horizontal")
      }, 1000);
    } else if (!this.state.questions.length) {
      document.querySelector("#mobile").classList.add("wobble-horizontal")
      window.setTimeout(() => {
        document.querySelector("#mobile").classList.remove("wobble-horizontal")
      }, 1000);
    }
  }

  render() {
    return (
      <>
        <div>
          <button id="roomBack" onClick={() => this.backBtn()}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <div id="roomTitle">
            <p id="headTitle">Questions</p>
          </div>
        </div>
        <div id="roomBottom">
          <div id="inputTitle">
            <span>title : </span>
            <input
              id="titleBox"
              type="text"
              onChange={(e) => {
                if (this.byteCheck(e.target) <= 56) {
                  this.changeState("title", e.target.value);
                } else {
                  e.target.value = this.state.title;
                }
              }}
            ></input>
          </div>
          <div id="inputDesc">
            <div>description : </div>
            <textarea
              id="descBox"
              onChange={(e) => {
                if (this.byteCheck(e.target) < 200) {
                  this.changeState("description", e.target.value);
                } else {
                  e.target.value = this.state.description;
                }
              }}
            ></textarea>
            <div id="descCount">{this.state.descByte}/200</div>
          </div>

          <div>
            <ul id="questionList">
              {this.state.questions.map((question) => (
                <Question
                  key={question.id}
                  question={question}
                  deleteQuestion={this.deleteQuestion.bind(this)}
                />
              ))}
            </ul>
            <input
              id="inputQuestion"
              type="text"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="off"
              placeholder="+ add question"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "+ add question")}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  this.addQuestion(e.target.value);
                  e.target.value = "";
                }
              }}
            ></input>
          </div>
          <button id="startEndSaveBtn" onClick={() => this.startBtn()}>
            start
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(CreateRoom);
