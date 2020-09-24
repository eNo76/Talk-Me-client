import React from "react";
import "../css/CreateAndUpdate.css";
import remove from "../img/remove.png";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: this.props.question,
      deleteDisplay: false
    };
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleButtonRelease = this.handleButtonRelease.bind(this);
    this.handleButtonLeave = this.handleButtonLeave.bind(this);
    this.handleButtonEnter = this.handleButtonEnter.bind(this);
  }
  // 마우스를 누를 시 deleteDisplay의 값에 따라 시간을 달리하여 deleteDisplay의 값을 변경
  handleButtonPress() {
    this.buttonPressTimer = setTimeout(() => {
      this.setState({
        deleteDisplay: !this.state.deleteDisplay
      });
    }, this.state.deleteDisplay ? 0 : 1000);
  }
  // 마우스를 해제 할 시 buttonPressTimer의 타이머 해제
  handleButtonRelease() {
    clearTimeout(this.buttonPressTimer);
  }
  // 마우스가 태그에서 벗어날 시 deleteDisplay를 false로 변경
  handleButtonLeave() {
    this.buttonLeaveTimer = setTimeout(() => {
      this.setState({
        deleteDisplay: false
      });
    }, 1000)
  }
  // 마우스가 태그에 들어갈 시 buttonLeaveTimer의 타이머 해제
  handleButtonEnter() {
    clearTimeout(this.buttonLeaveTimer);
  }

  render() {
    return (
      <li className="question"
        onMouseLeave={this.handleButtonLeave}
        onMouseEnter={this.handleButtonEnter}
      >
        <div className="ring">
        </div>
        <div className="text"
          onMouseDown={this.handleButtonPress}
          onMouseUp={this.handleButtonRelease}>
          {this.state.question.text}
        </div>
        <div className="button">
          <button className="dndBtn"
            style={{ display: this.state.deleteDisplay ? "none" : "block" }}>
            <div className="dndStick"></div>
            <div className="dndStick"></div>
            <div className="dndStick"></div>
          </button>
          <button className="removeBtn"
            onClick={() => this.props.deleteQuestion(this.state.question.id)}
            style={{ display: this.state.deleteDisplay ? "block" : "none" }}>
            <img className="remove" src={remove} />
          </button>
        </div>
      </li>
    );
  }
}

export default Question;
