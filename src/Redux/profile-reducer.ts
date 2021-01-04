import { ResultCodeEnum } from "../api/api";
import { actions as authActions } from "./auth-reducer";
import { stopSubmit } from "redux-form";
import {
  photosType,
  profileType,
  setProfileAvatarActionType,
} from "./types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionsType } from "./redux-store";
import { profileAPI } from "../api/profile-api";








let initialState = {
  posts: [
    { id: 1, post: "hello", likesCount: 10 },
    { id: 2, post: "how are you?", likesCount: 15 },
    { id: 3, post: "it's very nice", likesCount: 5 },
  ] as Array<postsType>,
  newPostText: "" as string ,
  profile: null as profileType | null,
  status: "" as string,
};


const profileReducer = (
  state = initialState,
  action: ActionsType
): initialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD_POST" :
      return {
        ...state,
        posts: [
          ...state.posts,
          { id: 4, post: action.newPostBody, likesCount: 0 },
        ],
      };
    case "SN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };
    case "SN/PROFILE/GET_STATUS":
      return {
        ...state,
        status: action.status,
      };
    case "SN/PROFILE/SET_PHOTO":
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as profileType,
      };
    default:
      return state;
  }
};

export const actions = {
  addPost: (newPostBody: string) => ({
    type: "SN/PROFILE/ADD_POST" ,
     newPostBody,
  } as const) ,
  setUserProfile: (profile: profileType) => ({
    type: "SN/PROFILE/SET_USER_PROFILE",
    profile,
  } as const),
  getStatus: (status: string) => ({
    type: "SN/PROFILE/GET_STATUS",
    status,
  } as const),
  setPhoto: (photos: photosType) => ({
    type: "SN/PROFILE/SET_PHOTO",
    photos,
  } as const),
};



export const getProfileThunkCreator = (userId: number): ThunkType => async (
  dispatch
) => {
  if (userId) {
    let data = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(data));
  }
};

export const getStatusThunkCreator = (userId: number): ThunkType => async (
  dispatch
) => {
  if (userId) {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.getStatus(data));
  }
};

export const updateStatusThunkCreator = (status: string): ThunkType => async (
  dispatch
) => {
  let data = await profileAPI.updateStatus(status);
  if (data.resultCode === ResultCodeEnum.success) {
    dispatch(actions.getStatus(status));
  }
};

export const savePhoto = (
  photo: object
): ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsType | setProfileAvatarActionType
> => async (dispatch) => {
  let data = await profileAPI.savePhoto(photo);
  if (data.resultCode === ResultCodeEnum.success) {
    dispatch(actions.setPhoto(data.data.photos));
    dispatch(authActions.setProfileAvatar(data.data.photos.small));
  }
};

export const saveProfile = (formData: profileType): ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.id;
  let data = await profileAPI.saveProfile(formData);
  if (data.resultCode === ResultCodeEnum.success) {
    if (userId != null){
  await  dispatch(getProfileThunkCreator(userId))}
    else{ throw new Error("userId can't be null")}
  } else {
    // @ts-ignore
    dispatch(stopSubmit("profileData", { _error: data.messages[0] }));
    return Promise.reject(data.messages[0]);
  }
};

type ActionsType = InferActionsType<typeof actions> | InferActionsType<typeof authActions>
type ThunkType = BaseThunkType<ActionsType>;
type postsType = {
  id: number;
  post: string;
  likesCount: number;
};
type initialStateType = typeof initialState;

export default profileReducer;
