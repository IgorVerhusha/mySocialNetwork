const ADD_POST = 'ADD-POST';
const CHANGE_NEW_POST_TEXT = 'CHANGE-NEW-POST-TEXT';

let initialState = {
    // массив с информацией о постах
    posts: [
        {id: 1, post: 'hello', likesCount: 10},
        {id: 2, post: 'how are you?', likesCount: 15},
        {id: 3, post: 'it\'s very nice', likesCount: 5}
    ],
    //набранный в текстареа текст
    newPostText: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 5, post: state.newPostText, likesCount: 0}],
                newPostText: ''
            };
        case CHANGE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.text
            };
        default:
            return state;

    }
}

export let addPostActionCreator = () => {
    return {
        type: ADD_POST
    }
}

export let changeNewPostTextActionCreator = (text) => {
    return {
        type: CHANGE_NEW_POST_TEXT,
        text: text
    }
}


export default profileReducer;