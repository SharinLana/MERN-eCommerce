import React from "react";

const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        {/* chat bootstrap icon */}
        <i className="bi bi-chat-dots"></i>
        {/* close bootstrap icon */}
        <i className="bi bi-x-circle"></i>
      </label>
    </>
  );
};

export default UserChatComponent;
