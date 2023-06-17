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
    </>
  );
};

export default UserChatComponent;
