import React, { useState, Fragment, useEffect } from "react";
import { Toast, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setMessageReceived } from "../redux/actions/chatActions";

const AdminChatRoomComponent = ({
  chatRoom,
  roomIndex,
  socket,
  socketUser,
}) => {
  [window["toast" + roomIndex], window["closeToast" + roomIndex]] =
    useState(true);
  const [rerender, setRerender] = useState(false);
  const dispatch = useDispatch();

  const close = (socketId) => {
    console.log(roomIndex)
    window["closeToast" + roomIndex](false);
    socket.emit("admin closes chat", socketId); // listen to the event in server.js
  };

  const adminSubmitChatMsg = (e, elem) => {
    e.preventDefault();
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    const message = document.getElementById(elem);
    let msg = message.value.trim();
    if (msg === "" || msg === null || msg === false || !msg) {
      return;
    }
    chatRoom[1].push({ admin: message.value });

    socket.emit("admin sends message", {user:socketUser, msg: msg});
    setRerender(!rerender);

    // Resetting the input field
    message.focus();
    dispatch(setMessageReceived(false));
    setTimeout(() => {
      message.value = "";
      const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 100);
  };

  // To scroll the incoming messages to the bottom
  useEffect(() => {
    const chatMessages = document.querySelector(`.cht-msg${socketUser}`);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });

  return (
    <>
      <Toast
        show={"toast" + roomIndex}
        onClose={() => close(chatRoom[0])}
        className="ms-4 mb-5"
      >
        <Toast.Header>
          <strong className="me-auto">Chat with User</strong>
        </Toast.Header>

        <Toast.Body>
          <div
            className={`cht-msg${socketUser}`}
            style={{ maxHeight: "500px", overflow: "auto" }}
          >
            {chatRoom[1].map((msg, idx) => (
              <Fragment key={idx}>
                {msg.client && (
                  <p
                    key={idx}
                    className="bg-primary p-3 ms-4 text-light rounded-pill"
                  >
                    <b>User wrote:</b> {msg.client}
                  </p>
                )}

                {msg.admin && (
                  <p key={idx}>
                    <b>Admin wrote:</b> {msg.admin}
                  </p>
                )}
              </Fragment>
            ))}
          </div>

          <Form>
            <Form.Group className="mb-3" controlId={`adminChatMsg${roomIndex}`}>
              <Form.Label>Write a message</Form.Label>
              <Form.Control
                onKeyUp={(e) =>
                  adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)
                }
                as="textarea"
                rows={2}
              />
            </Form.Group>
            <Button
              onClick={(e) => adminSubmitChatMsg(e, `adminChatMsg${roomIndex}`)}
              variant="success"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default AdminChatRoomComponent;
