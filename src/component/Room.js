import React from "react";
import { withRouter } from "react-router-dom";
import "../css/RoomList.css";
import edit from "../img/edit.png";
import dlt from "../img/delete.png";
import count from "../img/count.png";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.room.id,
      title: this.props.room.title,
      count: this.props.room.questionCount
    };
  }
  // 클릭 이벤트 발생 시 분기 후 처리
  clickList(e) {
    if (e === "edit") {
      this.props.history.push(`/updateroom/${this.state.id}`);
    } else if (e === "delete") {
      this.props.deleteRoom(this.state.id);
    } else {
      this.props.history.push({
        pathname: "/chattingroom",
        id: this.state.id
      });
    }
  }

  render() {
    return (
      <li className="roomList" onClick={(e) => this.clickList(e.target.className)}>
        <p className="roomTitle">
          {this.state.title}
        </p>
        <p className="roomDesc">
          <img className="checkBox" src={count} />
          <span className="roomCount">
            {`${this.state.count} count`}
          </span>
          <img className="edit" src={edit} />
          <img className="delete" src={dlt} />
        </p>
      </li>
    );
  }
}

export default withRouter(Room);
