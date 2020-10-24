import {profileAPI} from "../api/api";
import {setProfileAvatar} from "./auth-reducer";
import {stopSubmit} from "redux-form";
import {photosType, profileType } from "./types/types";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const GET_STATUS = 'GET_STATUS'
const SET_PHOTO = 'SET_PHOTO'


type postsType = {
    id: number
    post: string
    likesCount: number
}

let initialState = {
    // массив с информацией о постах
    posts: [
        {id: 1, post: 'hello', likesCount: 10},
        {id: 2, post: 'how are you?', likesCount: 15},
        {id: 3, post: 'it\'s very nice', likesCount: 5}
    ] as Array<postsType>,
    //набранный в текстареа текст
    newPostText: '' as string,
    profile: null as profileType | null,
    status: "" as string
};
type initialState = typeof initialState

const profileReducer = (state = initialState, action: any):initialState => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [...state.posts, {id: 4, post: action.newPostBody, likesCount: 0}],
            };
        case SET_USER_PROFILE:
            return {
                ...state, profile: action.profile
            };
        case GET_STATUS:
            return{
                ...state, status: action.status
            }
        case SET_PHOTO:
            return {
                ...state, profile: {...state.profile, photos: action.photos} as profileType
            }
        default:
            return state;

    }
}

type addPostActionType = {
    type: typeof ADD_POST
    newPostBody: string
}
export const addPost = (newPostBody:string):addPostActionType => ({ type: ADD_POST, newPostBody})


type setUserProfileActionType={
    type: typeof SET_USER_PROFILE
    profile: profileType
}
export const setUserProfile = (profile: profileType): setUserProfileActionType => ({ type: SET_USER_PROFILE, profile})

type getStatusType = {
    type: typeof GET_STATUS
    status:string
}
export const getStatus = (status: string):getStatusType => ({type: GET_STATUS, status})

type setPhotoActionType = {
    type: typeof SET_PHOTO
    photos: photosType
}
export const setPhoto = (photos:photosType): setPhotoActionType => ({type: SET_PHOTO, photos})

export const getProfileThunkCreator = (userId:number) => async (dispatch:any) => {
    if (userId) {
     let data = await profileAPI.getProfile(userId)
                 dispatch(setUserProfile(data));
    }
    };

export const getStatusThunkCreator = (userId:number) => async (dispatch:any) => {
    if (userId) {
        let data = await profileAPI.getStatus(userId)
        dispatch(getStatus(data));
    }
    }


export const updateStatusThunkCreator = (status:string) => async (dispatch:any) => {
     let data = await  profileAPI.updateStatus(status)
                if (data.resultCode === 0) {
                    dispatch(getStatus(status))
                }
}

export const savePhoto = (photo:object) => async (dispatch:any) => {
    let data = await profileAPI.savePhoto(photo)
    if (data.resultCode === 0) {
       dispatch(setPhoto(data.data.photos))
        dispatch(setProfileAvatar(data.data.photos.small))
    }
}

export const saveProfile = (formData:object) => async (dispatch:any, getState:any) => {
    const userId = getState().auth.id
    let data = await profileAPI.saveProfile(formData)
    if (data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId))
    } else {

        dispatch(stopSubmit("profileData", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;