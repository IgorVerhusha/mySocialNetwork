import { authThunkCreator } from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsType} from "./redux-store";



let initialState = {
  initialized: false,
};
type ActionsType = InferActionsType<typeof actions>
type initialStateType = typeof initialState
type ThunkType = BaseThunkType<ActionsType>

const appReducer = (state = initialState, action:ActionsType): initialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCCESS":
      return {
        ...state,
        initialized: true
      };
    default:
      return state;
  }
};



export const actions = {
  initializedSuccess : () => ({
    type: "SN/APP/INITIALIZED_SUCCESS" as const,
  })
}


export default appReducer;

export const initializeApp = (): ThunkType=> async (dispatch) => {
  await dispatch(authThunkCreator());
    dispatch(actions.initializedSuccess());
};
