import * as actionTypes from "../actionTypes/chat";

export const setChatRooms = (user, message) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_CHATROOMS,
    payload: {
      user: user,
      message: message,
    },
  });
};

export const setSocket = (socket) => async (dispatch) => {
  dispatch({
    type: actionTypes.SET_SOCKET,
    payload: {
      socket: socket,
    },
  });
};

export const setMessageReceived = (booleanValue) => async (dispatch) => {
  dispatch({
    type: actionTypes.MESSAGE_RECEIVED,
    payload: {
      booleanValue: booleanValue,
    },
  });
};

export const removeChatRoom = (socketId) => async (dispatch) => {
  dispatch({
    type: actionTypes.REMOVE_CHAT_ROOM,
    payload: {
      socketId: socketId
    }
  });
}
