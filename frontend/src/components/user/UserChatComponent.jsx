import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client"; // first step was done in server.js (//Real chat with socket.io)
import { useSelector } from "react-redux";
import "../../styles/chat.css";

const UserChatComponent = () => {
  const [socket, setSocket] = useState(false);
  const [chat, setChat] = useState([]);
  const [messageReceived, setMessageReceived] = useState(false);
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false);
  const [reconnect, setReconnect] = useState(false);
  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);
  /* 
  ! Example of how the chat array is going to look like:

  let chat = [
    {"client": "msg"},
    {"client": "msg"},
    {"admin": "msg"},
  ]
  */

  // Real Chat with Admin
  useEffect(() => {
    // ! When testing, make sure you are logged in as a CLIENT, not as admin
    if (!userInfo.isAdmin) {
      setReconnect(false);
      const socket = socketIOClient();

      // If admin is not present (not logged in)
      socket.on("no admin", (msg) => {
        setChat((chat) => {
          return [...chat, { admin: "admin is currently unavailable" }];
        });
      });

      socket.on("server sends message from admin to client", ({ message }) => {
        setChat((chat) => {
          return [...chat, { admin: message }];
        });
        setMessageReceived(true);
        // Move the scroll bar to the new message
        const chatMessages = document.querySelector(".cht-msg");
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });

      setSocket(socket);
      socket.on("admin closed chat", () => {
        setChat([]);
        setChatConnectionInfo(
          "Admin closed chat. Type something and submit to reconnect"
        );
        setReconnect(true);
      });
      return () => socket.disconnect(); // break connection if user left the chat component
    }
  }, [userInfo.isAdmin, reconnect]);

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    } else {
      setChatConnectionInfo("");
      setMessageReceived(false); // turn off the red indicator on the client side when the client sends a message
      const message = document.querySelector("#clientChatMsg");
      let msg = message.value.trim();

      if (msg === "" || msg === null || msg === false || !msg) {
        return;
      } else {
        socket.emit("client sends message", msg); // we are listening on the event "client sends message" in server.js
        setChat((chat) => {
          return [...chat, { client: msg }];
        });
      }
      // Resetting the input field
      message.focus();
      setTimeout(() => {
        message.value = "";
        const chatMessages = document.querySelector(".cht-msg");
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 200);
    }
  };

  return !userInfo.isAdmin ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        {/* chat bootstrap icon */}
        <i className="bi bi-chat-dots comment"></i>

        {/* Red indicator for the incoming message */}
        {messageReceived && (
          <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
        )}

        {/* close bootstrap icon */}
        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Ask a question</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
            <p>{chatConnectionInfo}</p>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p>
                    <b>You wrote:</b> {item.client}
                  </p>
                )}

                {item.admin && (
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>Support wrote:</b> {item.admin}
                  </p>
                )}
              </div>
            ))}
          </div>

          <textarea
            onKeyUp={(e) => clientSubmitChatMsg(e)}
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>

          <button
            onClick={(e) => clientSubmitChatMsg(e)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default UserChatComponent;
