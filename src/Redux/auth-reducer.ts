import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";
const SET_USER_DATA = "SET_USER_DATA";
const SET_PROFILE_AVATAR = "SET_PROFILE_AVATAR";
const LOGIN_IS_TRUE = "LOGIN_IS_TRUE";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL"


type InitialStateType = {
  id: null | number
  login: null | string
  email: null | string
  isAuth: boolean
  profileAvatar: boolean
  profileAvatarPath: null | string
  captchaUrl: null | string
}

let initialState: InitialStateType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  profileAvatar: false,
  profileAvatarPath: null,
  captchaUrl: null
};

const authReducer = (state = initialState, action: any): InitialStateType => {
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



type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA
  payload: setAuthUserDataActionTypePayloadType
}
type setAuthUserDataActionTypePayloadType = {
  id: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}
export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean ): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});

type setProfileAvatarActionType = {
  type: typeof SET_PROFILE_AVATAR
  profileAvatarPath: string
}

export const setProfileAvatar = (photo: string): setProfileAvatarActionType => ({
  type: SET_PROFILE_AVATAR,
  profileAvatarPath: photo,
});

type loginIsTrueActionType = {
  type: typeof LOGIN_IS_TRUE
}

export const loginIsTrue = ():loginIsTrueActionType  => ({ type: LOGIN_IS_TRUE });

type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL
  payload: setCaptchaUrlActionTypePayloadType
}
type setCaptchaUrlActionTypePayloadType = {
  captchaUrl: string
}

export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => ({
  type: SET_CAPTCHA_URL,
  payload: {captchaUrl}
})

export default authReducer;

export const authThunkCreator = () => async (dispatch: any) => {

 let data = await authAPI.auth();
    if (data.resultCode === 0) {
      let { id, email, login } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
      authAPI.setAuthProfile(id).then((data: any) => {
        dispatch(setProfileAvatar(data.photos.small));
      });
    }
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {
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

export const logoutThunkCreator = () => async (dispatch: any) => {
 let data = await authAPI.logout()
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async (dispatch: any) => {
  const data = await securityAPI.getCaptchaUrl()
    dispatch(setCaptchaUrl(data.url));
};

