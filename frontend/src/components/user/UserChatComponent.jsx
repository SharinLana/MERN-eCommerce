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
      </div>
    </>
  );
};

export default UserChatComponent;
