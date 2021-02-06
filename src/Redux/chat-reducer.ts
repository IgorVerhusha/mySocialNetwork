
import { BaseThunkType, InferActionsType } from "./redux-store";
import { chatAPI, ChatMessageType } from "../api/chat-api";
import { Dispatch } from "redux";


type StatusType = 'pending' | 'ready'
let initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
};

const chatReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/chat/MESSAGES_RECEIVED":
      return {
        ...state,
        messages: [...state.messages, ...action.payload],
      };
    case "SN/chat/STATUS_CHANGED":
      return {
        ...state,
        status: action.payload
      };
    default:
      return state;
  }
};

export const actions = {
  messagesReceived: (messages: ChatMessageType[]) =>
    ({
      type: "SN/chat/MESSAGES_RECEIVED",
      payload: messages,
    } as const),
  statusChanged: (payload: StatusType) =>
      ({
        type: "SN/chat/STATUS_CHANGED",
        payload: payload,
      } as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
   chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe(newMessageHandlerCreator(dispatch));
  chatAPI.stop()
};

export const sendMessage = (message:string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
};


export default chatReducer;

type InitialStateType = typeof initialState;
type ActionsType = InferActionsType<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
