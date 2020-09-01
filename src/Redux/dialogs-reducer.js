const SEND_MESSAGE = 'SEND-MESSAGE';


let messageId = 5;
let initialState = {
    messages: [
        {
            id: 1, message: 'Hi'
        },
        {
            id: 2, message: 'How are you?'
        },
        {
            id: 3, message: 'I\'m OK', style: {
                background: '#1c607d',
                marginLeft: '20%'
            }
        },
        {
            id: 4, message: 'How about you?', style: {
                background: '#1c607d',
                marginLeft: '20%'
            }
        }
    ],
    // массив с диалогами
    dialogs: [
        {id: 1, name: 'Igor', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2700.jpg'},
        {id: 2, name: 'Nikita', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2506.jpg'},
        {id: 3, name: 'Anton', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3317.jpg'},
        {id: 4, name: 'Andrey', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2672.jpg'},
        {id: 5, name: 'Yuli', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3171.jpg'},
        {id: 6, name: 'Vlad', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2812.jpg'}
    ]
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...state.messages, {id:messageId++, message: action.newMessageBody}],
            };

        default:
            return state
    }
}

export let sendMessage = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
}



export default dialogsReducer;