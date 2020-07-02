import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsNavReducer from "./friends-nav-reducer";

let store = {

    _callSubscriber() {
        console.log('state is changed')
    },

// объект с массивами данных
    _state: {
        profilePage: {
            // массив с информацией о постах
            posts: [
                {id: 1, post: 'hello', likesCount: 10},
                {id: 2, post: 'how are you?', likesCount: 15},
                {id: 3, post: 'it\'s very nice', likesCount: 5}
            ],
            //набранный в текстареа текст
            newPostText: ''
        },
        // массив с сообщениями
        messagesPage: {
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
        },
        //массив с друзьями
        friendsNav: [
            {id: 1, name: 'Igor', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2700.jpg'},
            {id: 2, name: 'Nikita', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2506.jpg'},
            {id: 3, name: 'Anton', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3317.jpg'},
            {id: 4, name: 'Andrey', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2672.jpg'},
            {id: 5, name: 'Yuli', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3171.jpg'},
            {id: 6, name: 'Vlad', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar2812.jpg'},
            {id: 7, name: 'Zhenya', avatar: 'https://cs16planet.ru/steam-avatars/images/avatar3268.jpg'}
        ]
    },
    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) {
    profileReducer(this._state.profilePage, action);
    dialogsReducer(this._state.messagesPage, action);
    friendsNavReducer(action);
    this._callSubscriber(this._state)
    }
}





export default store;