import React from "react";
import "../../styles/chat.css";

const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        {/* chat bootstrap icon */}
        <i className="bi bi-chat-dots comment"></i>
        {/* close bootstrap icon */}
        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Ask a question</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
            <p>Chat history</p>
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>

          <button className="btn btn-success btn-block">Submit</button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
