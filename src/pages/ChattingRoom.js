import React from "react";
import QuestionAnswerPair from "../component/QuestionAnswerPair";
import { withRouter } from "react-router-dom";
import "../css/ChattingRoom.css";
import plane from "../img/plane.png";

class ChattingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: "",
      questions_answers: [],
      answer: "",
      idx: 0,
    };
    this.handlingQuestions = this.handlingQuestions.bind(this);
    this.handlingAnswers = this.handlingAnswers.bind(this);
    this.handlingInputValue = this.handlingInputValue.bind(this);
  }

  componentDidMount() {
    const { id, title, questions } = this.props.location;

    //id가 있으면 유저 -> id가지고 api요청 setstate, this.props.location.id
    if (id) {
      fetch(`/room/${id}/questions`)
        .then(res => res.json())
        .then(data => this.setState({
          //타이틀과 첫번째 질문 셋팅
          data: data.questions,
          title: data.questions[0].Room.title,
          questions_answers: [
            {
              id: data.questions[0].id,
              text: data.questions[0].text
            }
          ]
        }
        ));
    }
    //없으면 게스트 -> props 다시 확인해서 setstate  this.props.location.title, this.props.location.questions[0]
    else if (questions) {
      this.setState({
        //타이틀과 첫번째 질문 셋팅
        data: questions,
        title: title,
        questions_answers: [
          {
            id: questions[0].id,
            text: questions[0].text,
          },
        ],
      });
    }
    //
    else {
      this.props.history.push("/intro");
    }
  }

  handlingInputValue(e) {
    this.setState({ answer: e.target.value });
  }

  handlingAnswers() {
    const { idx, answer, questions_answers } = this.state;
    let newQuestions_answers = questions_answers;
    //answer 객체 추가
    newQuestions_answers.push({
      id: questions_answers[questions_answers.length - 1].id + 0.1,
      answer: answer,
    });
    //state에 answer 추가 및 index + 1
    this.setState({
      answer: "",
      questions_answers: newQuestions_answers,
      idx: idx + 1,
    });
    setTimeout(() => this.moveScrollbar(), 100);
  }

  handlingQuestions() {
    console.log("question");
    const { data, idx, questions_answers } = this.state;
    //다음 질문이 있으면
    if (data[idx]) {
      let newQuestions_answers = questions_answers;
      //state에 question 객체 추가
      newQuestions_answers.push({
        id: data[idx].id,
        text: data[idx].text,
      });
      //state에 question 추가
      this.setState({ questions_answers: newQuestions_answers });
      setTimeout(() => this.moveScrollbar(), 900);
    }
    //다음 질문이 없으면
    else {
      setTimeout(() => this.moveScrollbar(), 300);
      return;
    }
  }

  moveScrollbar() {
    const messageBox = document.getElementById("messageBox");
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  render() {
    const { title, questions_answers } = this.state;
    return (
      <div id="chat-wrapper">
        <header id="chat-header">
          {/*뒤로가기 버튼을 누르면 질문작성화면으로 이동*/}
          <button
            id="chattingRoomBack"
            onClick={() => {
              if (this.props.isLogin) {
                this.props.history.push("/roomlist");
              } else if (this.props.isGuest) {
                this.props.history.push("/createroom");
              } else {
                this.props.history.push("/intro");
              }
            }}
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          {/*Room의 title 뿌려주기*/}
          {title ? (
            <div id="chattingRoomTitle">
              <p id="headTitle">{title}</p>
            </div>
          ) : (
              ""
            )}
        </header>

        {/*Questions_Answers 뿌려주기*/}
        <div id="messageBox">
          {questions_answers.length
            ? questions_answers.map((el) => (
              <QuestionAnswerPair key={el.id} data={el} />
            ))
            : ""}
        </div>

        {/*입력받은 값을을 state에 저장하고 보내기버튼 클릭시 메시지 생성*/}
        <div id="inputBox">
          <input
            type="text"
            id="answerInput"
            placeholder="send messages...."
            autoComplete="off"
            onChange={(e) => this.handlingInputValue(e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (this.state.answer.length === 0) {
                  return;
                }
                this.handlingAnswers();
                window.setTimeout(this.handlingQuestions, 1000);
                e.target.value = "";
              }
            }}
          ></input>
          <div
            id="submitBtn"
            onClick={() => {
              if (this.state.answer.length === 0) {
                return;
              }
              this.handlingAnswers();
              window.setTimeout(this.handlingQuestions, 1000);
              document.querySelector("#answerInput").value = "";
            }}
          >
            <img id="img" src={plane}></img>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ChattingRoom);
