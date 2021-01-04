import {InferActionsType} from "./redux-store";


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

export type initialStateType = typeof initialState
export type ActionsType = InferActionsType<typeof actions>



 const dialogsReducer = (state = initialState, action:ActionsType):initialStateType => {
  switch (action.type) {
    case "SN/DIALOGS/SEND-MESSAGE":
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

export const actions = {
  sendMessage: (newMessageBody:string) => ({
        type: "SN/DIALOGS/SEND-MESSAGE",
        newMessageBody,
      } as const
  )
}


