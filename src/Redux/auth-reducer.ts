import {
  ResultCodeEnum, ResultCodeForCaptcha
} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {BaseThunkType, InferActionsType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";



let initialState = {
  id: null as number | null,
  login: null as string| null,
  email: null as string| null,
  isAuth: false,
  profileAvatar: false,
  profileAvatarPath: null as string| null,
  captchaUrl: null as string| null,
};


const authReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
    case  "SN/AUTH/SET_CAPTCHA_URL":
      return {
        ...state,
        ...action.payload,
      };
    case "SN/AUTH/SET_PROFILE_AVATAR":
      return {
        ...state,
        profileAvatarPath: action.profileAvatarPath,
        profileAvatar: true,
      };
    case "SN/AUTH/LOGIN_IS_TRUE":
      return {
        ...state,
        isAuth: true,
      };
    default:
      return state;
  }
};


export const actions = {
  setAuthUserData : (
      id: number | null,
      email: string | null,
      login: string | null,
      isAuth: boolean
  ) => ({
    type: "SN/AUTH/SET_USER_DATA",
    payload: { id, email, login, isAuth }
  } as const),
  setProfileAvatar : (
      photo: string | null
  )=> ({
    type: "SN/AUTH/SET_PROFILE_AVATAR",
    profileAvatarPath: photo,
  } as const),
  loginIsTrue : () => ({
    type: "SN/AUTH/LOGIN_IS_TRUE",
  } as const),
  setCaptchaUrl : (captchaUrl: string) => ({
    type:  "SN/AUTH/SET_CAPTCHA_URL",
    payload: { captchaUrl },
  } as const )
}





export default authReducer;



export const authThunkCreator = (): ThunkType => async (dispatch) => {
  let data = await authAPI.auth();
  if (data.resultCode === ResultCodeEnum.success) {
    let { id, email, login } = data.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
    authAPI.setAuthProfile(id).then((data: any) => {
      dispatch(actions.setProfileAvatar(data.photos.small));
    });
  }
};

export const loginThunkCreator = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string | null
): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodeEnum.success) {
   await dispatch(authThunkCreator());
  } else {
    if (data.resultCode === ResultCodeForCaptcha.captchaIsRequired) {
     await dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Common wrong";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === ResultCodeEnum.success) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  dispatch(actions.setCaptchaUrl(data.url));
};


type InitialStateType = typeof initialState
type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>