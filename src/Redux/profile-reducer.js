import {profileAPI} from "../api/api";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = 'GET_STATUS'


let postId = 5


let initialState = {
    // массив с информацией о постах
    posts: [
        {id: 1, post: 'hello', likesCount: 10},
        {id: 2, post: 'how are you?', likesCount: 15},
        {id: 3, post: 'it\'s very nice', likesCount: 5}
    ],
    //набранный в текстареа текст
    newPostText: '',
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: postId++, post: action.newPostBody, likesCount: 0}],
            };

        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            };
        case GET_STATUS:

            return{
                ...state, status: action.status
            }
        default:
            return state;

    }
}

export const addPost = (newPostBody) => ({ type: ADD_POST, newPostBody})
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile})
export const getStatus = (status) => ({type: GET_STATUS, status})


export const getProfileThunkCreator = (userId) => async (dispatch) => {
    if (userId) {
     let data = await profileAPI.getProfile(userId)
                 dispatch(setUserProfile(data));
    }
    };

export const getStatusThunkCreator = (userId) => async (dispatch) => {
    if (userId) {
        let data = await profileAPI.getStatus(userId)
        dispatch(getStatus(data));
    }
    }


export const updateStatusThunkCreator = (status) => async (dispatch) => {
     let data = profileAPI.updateStatus(status)
                if (data.resultCode === 0) {
                    dispatch(getStatus(status))
                }
}


export default profileReducer;