import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
const SET_USER_DATA = "SET_USER_DATA";
const SET_PROFILE_AVATAR = "SET_PROFILE_AVATAR";
const LOGIN_IS_TRUE = "LOGIN_IS_TRUE";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"

let initialState = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  profileAvatar: false,
  profileAvatarPath: null,
  captchaUrl: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload
      };
    case SET_PROFILE_AVATAR:
      return {
        ...state,
        profileAvatarPath: action.profileAvatarPath,
        profileAvatar: true,
      };
    case LOGIN_IS_TRUE:
      return {
        ...state,
        isAuth: true,
      };
    default:
      return state;
  }
};

export let setAuthUserData = (id, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});
export let setProfileAvatar = (photo) => ({
  type: SET_PROFILE_AVATAR,
  profileAvatarPath: photo,
});
export let loginIsTrue = () => ({ type: LOGIN_IS_TRUE });

export const setCaptchaUrl = (captchaUrl) => ({
  type: SET_CAPTCHA_URL,
  payload: {captchaUrl}
})

export default authReducer;

export const authThunkCreator = () => async (dispatch) => {

 let data = await authAPI.auth();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
      authAPI.setAuthProfile(id).then((data) => {
        dispatch(setProfileAvatar(data.photos.small));
      });
    }
};

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
      dispatch(authThunkCreator());
    } else {
      if (data.resultCode === 10) {
        dispatch(getCaptchaUrl())
      }
      let message = data.messages.length > 0 ? data.messages[0] : "Common wrong"
     dispatch(stopSubmit("login", {_error: message}))
    }
};

export const logoutThunkCreator = () => async (dispatch) => {
 let data = await authAPI.logout()
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {

  const data = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaUrl(data.url));
};
