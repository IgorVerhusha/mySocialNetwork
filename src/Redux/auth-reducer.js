import {authAPI} from "../api/api";


const SET_USER_DATA = 'SET_USER_DATA';
const SET_PROFILE_AVATAR = 'SET_PROFILE_AVATAR'


let initialState = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    profileAvatar: false,
    profileAvatarPath: null
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            }
        case SET_PROFILE_AVATAR:
            return {
                ...state,
                profileAvatarPath: action.profileAvatarPath,
                profileAvatar: true
            }
        default:
            return state;
    }
}


export let setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id, email, login}})
export let setProfileAvatar = (photo) => ({type: SET_PROFILE_AVATAR,  profileAvatarPath: photo})


export default authReducer




export const authThunkCreator = () => {
    return (dispatch) => {
        authAPI.auth().then((data) => {
            if (data.resultCode === 0) {
                let { id, email, login } = data.data;
                dispatch(setAuthUserData(id, email, login));
                authAPI.setAuthProfile(id).then((data) => {
                    dispatch(setProfileAvatar(data.photos.small));
                });
            }
        });
    };
};