import { authThunkCreator } from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

type initialStateType = {
  initialized: boolean,
};

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action:ActionsTypes): initialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};

type ActionsTypes = initializedSuccessActionType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export let initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

export default appReducer;

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(authThunkCreator());
    dispatch(initializedSuccess());
};
