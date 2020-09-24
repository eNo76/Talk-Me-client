import React from "react";

class QuestionAnswerPair extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      //props로 질문만 오면
      this.props.data.text ?
        <div className="questionBox">
          <div className="questionMessage">
            <div className="questionText">{this.props.data.text}</div>
            <div className="questionBottom"></div>
          </div>
        </div>

        :
        //답변이 오면
        <div className="answerBox">
          <div className="answerMessage">
            <div className="answerText">{this.props.data.answer}</div>
            <div className="answerBottom"></div>
          </div>
        </div>
    );
  }
}

export default QuestionAnswerPair;
