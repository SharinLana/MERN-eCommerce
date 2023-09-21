import * as actionTypes from "../actionTypes/chat";

const CHAT_INITIAL_STATE = {
  messageReceived: false,
  socket: false,
  chatRooms: {},
};

export const adminChatReducer = (state = CHAT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_CHATROOMS:
      var currentState = { ...state };
      if (state.chatRooms[action.payload.user]) {
        currentState.chatRooms[action.payload.user].push({
          client: action.payload.message,
        });
        return {
          ...state,
          chatRooms: { ...currentState.chatRooms },
        };
      } else {
        return {
          ...state,
          chatRooms: {
            ...currentState.chatRooms,
            [action.payload.user]: [{ client: action.payload.message }],
          },
        };

        /*
        ! Example of the output based on the SET_CHATROOM case logic:
        ['exampleUser', Array(2)] => closer to the array: [{client: 'hello'}, {client: 'i have a question'}]
        */
      }
    case actionTypes.SET_SOCKET:
      return {
        ...state,
        socket: action.payload.socket,
      }
    case actionTypes.MESSAGE_RECEIVED:
      return {
        ...state,
        messageReceived: action.payload.booleanValue,
      }
    case actionTypes.REMOVE_CHAT_ROOM:
      var currentState2 = {...state};
      delete currentState2.chatRooms[action.payload.socketId];
      return {
        ...state,
        chatRooms: {...currentState2.chatRooms},
      }
    default:
      return state;
  }
};
