import React from "react";
import AdminLinksComponent from "../../components/AdminLinksComponent";
import AdminChatRoomComponent from "../../components/AdminChatRoomComponent";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const AdminChatsPage = () => {
  const { chatRooms, socket } = useSelector((state) => state.adminChat);
  // console.log(chatRooms); // output: {to do: 'chatrooms for admin', exampleUser: 'hey'}

  return (
    <Row className="m-5">
      <Col md={2}>
        <AdminLinksComponent />
      </Col>
      <Col md={10}>
        <Row>
          {Object.entries(chatRooms).map((chatRoom, index) => (
            // roomIndex={index+1} to count chat boxes starting from 1, not from 0
            <AdminChatRoomComponent
              key={index}
              chatRoom={chatRoom}
              roomIndex={index + 1}
              socketUser={chatRoom[0]}
              socket={socket}
            />
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default AdminChatsPage;
