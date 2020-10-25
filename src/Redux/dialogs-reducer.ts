const SEND_MESSAGE = "SEND-MESSAGE";

// type initialStateType = {
//   messages: Array<messagesType>
//   dialogs: Array<dialogsType>
// }

type messagesType = {
  id: number
  message:string
  style?:object
}

type dialogsType = {
  id: number
  name:string
  avatar: string
}
let initialState = {
  messages: [
    {
      id: 1,
      message: "Hi",
    },
    {
      id: 2,
      message: "How are you?",
    },
    {
      id: 3,
      message: "I'm OK",
      style: {
        background: "#1c607d",
        marginLeft: "20%",
      },
    },
    {
      id: 4,
      message: "How about you?",
      style: {
        background: "#1c607d",
        marginLeft: "20%",
      },
    },
  ] as Array<messagesType>,

  dialogs: [
    {
      id: 1,
      name: "Igor",
      avatar: "https://cs16planet.ru/steam-avatars/images/avatar2700.jpg",
    },
    {
      id: 2,
      name: "Nikita",
      avatar: "https://cs16planet.ru/steam-avatars/images/avatar2506.jpg",
    },
    {
      id: 3,
      name: "Anton",
      avatar: "https://cs16planet.ru/steam-avatars/images/avatar3317.jpg",
    },
    {
      id: 4,
      name: "Andrey",
      avatar: "https://cs16planet.ru/steam-avatars/images/avatar2672.jpg",
    },
    {
      id: 5,
      name: "Yuli",
      avatar: "https://cs16planet.ru/steam-avatars/images/avatar3171.jpg",
    },
    {
      id: 6,
      name: "Vlad",
      avatar: "https://cs16planet.ru/steam-avatars/images/avatar2812.jpg",
    },
  ] as Array<dialogsType>,
};

type initialStateType = typeof initialState

 const dialogsReducer = (state = initialState, action:ActionsTypes):initialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 7, message: action.newMessageBody },
        ],
      };

    default:
      return state;
  }
};

export default dialogsReducer

type ActionsTypes = sendMessageActionType

type sendMessageActionType = {
  type: typeof SEND_MESSAGE
  newMessageBody: string
}
export let sendMessage = (newMessageBody:string):sendMessageActionType => ({
    type: SEND_MESSAGE,
    newMessageBody,
  }
)

