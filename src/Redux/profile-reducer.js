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


export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
            profileAPI.getProfile(userId)
                .then((data) => {
                    dispatch(setUserProfile(data));
                })
        }
    };

export const getStatusThunkCreator = (userId) => (dispatch) => {
        profileAPI.getStatus(userId)
            .then((data) => {
                dispatch(getStatus(data));
            })
    }


export const updateStatusThunkCreator = (status) => (dispatch) => {
        profileAPI.updateStatus(status)
            .then((data) => {
                if (data.resultCode === 0) {
                    dispatch(getStatus(status))
                }
            })
    }


export default profileReducer;