import { authThunkCreator } from "./auth-reducer";
const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

type initialStateType = {
  initialized: boolean,
};

let initialState: initialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action:any): initialStateType => {
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

type initializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export let initializedSuccess = (): initializedSuccessActionType => ({
  type: INITIALIZED_SUCCESS,
});

export default appReducer;

export const initializeApp = () => async (dispatch: any) => {
  await dispatch(authThunkCreator());
    dispatch(initializedSuccess());
};
