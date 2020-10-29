import { authAPI, ResultCodeEnum, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = "SET_USER_DATA";
const SET_PROFILE_AVATAR = "SET_PROFILE_AVATAR";
const LOGIN_IS_TRUE = "LOGIN_IS_TRUE";
const SET_CAPTCHA_URL = "SET_CAPTCHA_URL";

type InitialStateType = {
  id: null | number;
  login: null | string;
  email: null | string;
  isAuth: boolean;
  profileAvatar: boolean;
  profileAvatarPath: null | string;
  captchaUrl: null | string;
};

let initialState: InitialStateType = {
  id: null,
  login: null,
  email: null,
  isAuth: false,
  profileAvatar: false,
  profileAvatarPath: null,
  captchaUrl: null,
};

const authReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case SET_CAPTCHA_URL:
      return {
        ...state,
        ...action.payload,
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

type ActionsTypes =
  | setProfileAvatarActionType
  | loginIsTrueActionType
  | setCaptchaUrlActionType
  | setAuthUserDataActionType;

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA;
  payload: setAuthUserDataActionTypePayloadType;
};
type setAuthUserDataActionTypePayloadType = {
  id: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
};
export const setAuthUserData = (
  id: number | null,
  email: string | null,
  login: string | null,
  isAuth: boolean
): setAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { id, email, login, isAuth },
});

export type setProfileAvatarActionType = {
  type: typeof SET_PROFILE_AVATAR;
  profileAvatarPath: string;
};

export const setProfileAvatar = (
  photo: string
): setProfileAvatarActionType => ({
  type: SET_PROFILE_AVATAR,
  profileAvatarPath: photo,
});

type loginIsTrueActionType = {
  type: typeof LOGIN_IS_TRUE;
};

export const loginIsTrue = (): loginIsTrueActionType => ({
  type: LOGIN_IS_TRUE,
});

type setCaptchaUrlActionType = {
  type: typeof SET_CAPTCHA_URL;
  payload: setCaptchaUrlActionTypePayloadType;
};
type setCaptchaUrlActionTypePayloadType = {
  captchaUrl: string;
};

export const setCaptchaUrl = (captchaUrl: string): setCaptchaUrlActionType => ({
  type: SET_CAPTCHA_URL,
  payload: { captchaUrl },
});

export default authReducer;

type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const authThunkCreator = (): ThunkType => async (dispatch) => {
  let data = await authAPI.auth();
  if (data.resultCode === ResultCodeEnum.success) {
    let { id, email, login } = data.data;
    dispatch(setAuthUserData(id, email, login, true));
    authAPI.setAuthProfile(id).then((data: any) => {
      dispatch(setProfileAvatar(data.photos.small));
    });
  }
};

export const loginThunkCreator = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): ThunkType => async (dispatch) => {
  let data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodeEnum.success) {
    dispatch(authThunkCreator());
  } else {
    if (data.resultCode === ResultCodeEnum.captchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    let message = data.messages.length > 0 ? data.messages[0] : "Common wrong";
    dispatch(stopSubmit("login", { _error: message }));
  }
};

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
  let data = await authAPI.logout();
  if (data.resultCode === ResultCodeEnum.success) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
  const data = await securityAPI.getCaptchaUrl();
  dispatch(setCaptchaUrl(data.url));
};
