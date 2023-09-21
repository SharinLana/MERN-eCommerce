import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
  Form,
  DropdownButton,
  Dropdown,
  Button,
  InputGroup,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";

import { logout } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions/categoryActions";
import {
  setChatRooms,
  setSocket,
  setMessageReceived,
  removeChatRoom,
} from "../redux/actions/chatActions";

const HeaderComponent = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userRegisterLogin);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const { categories } = useSelector((state) => state.getCategories);
  const { messageReceived } = useSelector((state) => state.adminChat);
  // states
  const [searchCategoryToggle, setSearchCategoryToggle] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const submitSearchHandler = (e) => {
    if (e.keyCode && e.keyCode !== 13) return;
    e.preventDefault();
    if (searchQuery.trim()) {
      if (searchCategoryToggle === "All") {
        navigate(`/product-list/search/${searchQuery}`);
      } else {
        navigate(
          `/product-list/category/${searchCategoryToggle.replaceAll(
            "/",
            ","
          )}/search/${searchQuery}`
        );
      }
    } else if (searchCategoryToggle !== "All") {
      navigate(
        `/product-list/category/${searchCategoryToggle.replaceAll("/", ",")}`
      );
    } else {
      navigate("/product-list");
    }
  };

  // Admin receives chat messages from user
  useEffect(() => {
    // ! When testing, make sure you are logged in as an ADMIN, not as client
    if (userInfo.isAdmin) {
      const socket = socketIOClient();
      // If admin is available
      socket.emit("admin connected with server", "Admin" + Math.floor(Math.random() * 1000000000000));
      // Listening for the incoming client message
      socket.on("server sends message from client to admin", ({ user, message }) => {
        // console.log(message); // to test, open 2 browser windows: one for admin and one for client
        /*   
        ! View of the redux chatRooms structure in adminChatReducers.js
          let chatRooms = {
             fddf54gfgfSocketID: [{ "client": "dsfdf" }, { "client": "dsfdf" }, { "admin": "dsfdf" }],
          };

          ! fddf54gfgfSocketID = id of the client, created by Socket.io
         */
        dispatch(setMessageReceived(true));
        dispatch(setSocket(socket));
        dispatch(setChatRooms(user, message)); // next, go to pages/admin/AdminChatsPage.js
      });
      // socket.on("disconnected", ({ reason, socketId }) => {
      //   dispatch(removeChatRoom(socketId));
      // });
      return () => socket.disconnect(); // break connection if user left the chat component
    }
  }, [userInfo.isAdmin]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/">BEST ONLINE SHOP</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <InputGroup>
              <DropdownButton
                id="dropdown-basic-button"
                title={searchCategoryToggle}
              >
                <Dropdown.Item onClick={() => setSearchCategoryToggle("All")}>
                  All
                </Dropdown.Item>
                {categories.map((cat, id) => (
                  <Dropdown.Item
                    key={id}
                    onClick={() => setSearchCategoryToggle(cat.name)}
                  >
                    {cat.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              {/* Search bar */}
              <Form.Control
                type="text"
                placeholder="Search in shop ..."
                onKeyUp={submitSearchHandler}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="warning" onClick={submitSearchHandler}>
                <i className="bi bi-search text-dark"></i>
              </Button>
            </InputGroup>
          </Nav>
          <Nav>
            {userInfo.isAdmin ? (
              <LinkContainer to="/admin/orders">
                <Nav.Link>
                  Admin
                  {/* Red indicator for the incoming message */}
                  {messageReceived && (
                    <span className="position-absolute top-1 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>
                  )}
                </Nav.Link>
              </LinkContainer>
            ) : userInfo.name && !userInfo.isAdmin ? (
              <>
                <NavDropdown
                  title={`${userInfo.name} ${userInfo.lastName}`}
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item
                    eventKey="/user/my-orders"
                    as={Link}
                    to="/user/my-orders"
                  >
                    My orders
                  </NavDropdown.Item>
                  <NavDropdown.Item eventKey="/user" as={Link} to="/user">
                    My profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => dispatch(logout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart">
              <Nav.Link>
                <Badge pill bg="danger">
                  {itemsCount === 0 ? "" : itemsCount}
                </Badge>
                <i className="bi bi-cart-dash"></i>
                <span className="ms-1">CART</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
