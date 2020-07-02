const SEND_MESSAGE = 'SEND-MESSAGE';
const CHANGE_NEW_MESSAGE_TEXT = 'CHANGE-NEW-MESSAGE-TEXT';

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
    ],
    // набранный текст в меседже
    newMessageText: ''
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                newMessageText: '',
                messages: [...state.messages, {id:5, message: state.newMessageText}],
            };

        case CHANGE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.text
            };

        default:
            return state
    }
}

export let sendMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    }
}

export let changeNewMessageTextActionCreator = (text) => {
    return {
        type: CHANGE_NEW_MESSAGE_TEXT,
        text: text
    }
}


export default dialogsReducer;