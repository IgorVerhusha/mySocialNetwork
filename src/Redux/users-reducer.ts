import { ResultCodeEnum } from "../api/api";
import { updateObjectInArray } from "../utils/helpFunctions";
import { userType } from "./types/types";
import { Dispatch } from "redux";
import { AppStateType, InferActionsType } from "./redux-store";
import { ThunkAction } from "redux-thunk";
import { usersAPI } from "../api/users-api";

type initialState = typeof initialState;

let initialState = {
  users: [] as Array<userType>,
  pageSize: 10 as number,
  totalUsersCount: 0 as number,
  currentPage: 1 as number,
  isFetching: false as boolean,
  followingInProgress: [] as Array<number>,
  paginatorPage: 1 as number,
};

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): initialState => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SET_USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET_PAGINATOR_PAGE":
      return {
        ...state,
        paginatorPage: action.currentPaginatorPage,
      };
    case "SET_TOTAL_USERS_COUNT":
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    case "TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "TOGGLE_IS_FOLLOWING_PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : (state.followingInProgress.filter(
              (id: number) => id !== action.userId
            ) as Array<number>),
      };

    default:
      return state;
  }
};

export default usersReducer;

export const actions = {
  follow: (userId: number) =>
    ({
      type: "FOLLOW",
      userId,
    } as const),
  unfollow: (userId: number) =>
    ({
      type: "UNFOLLOW",
      userId,
    } as const),
  setUsers: (users: Array<userType>) =>
    ({
      type: "SET_USERS",
      users,
    } as const),
  setCurrentPage: (pageNumber: number) =>
    ({
      type: "SET_CURRENT_PAGE",
      currentPage: pageNumber,
    } as const),
  setPaginatorPage: (pageNumber: number) =>
    ({
      type: "SET_PAGINATOR_PAGE",
      currentPaginatorPage: pageNumber,
    } as const),
  setTotalUsersCount: (totalCount: number) =>
    ({
      type: "SET_TOTAL_USERS_COUNT",
      totalCount: totalCount,
    } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: "TOGGLE_IS_FETCHING",
      isFetching,
    } as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: "TOGGLE_IS_FOLLOWING_PROGRESS",
      isFetching,
      userId,
    } as const),
};

type ActionsTypes = InferActionsType<typeof actions>;
type DispatchType = Dispatch<ActionsTypes>;
type ThunkType = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>;

export const getUsersThunkCreator = (
  currentPage: number,
  pageSize: number
): ThunkType => async (dispatch) => {
  dispatch(actions.toggleIsFetching(true));
  let data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(actions.toggleIsFetching(false));
  dispatch(actions.setUsers(data.items));
  dispatch(actions.setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (
  id: number,
  dispatch: DispatchType,
  followType: any,
  actionCreator: (id: number) => ActionsTypes
) => {
  dispatch(actions.toggleIsFollowingProgress(true, id));
  let data = await followType(id);
  if (data.resultCode === ResultCodeEnum.success) {
    dispatch(actionCreator(id));
  }
  dispatch(actions.toggleIsFollowingProgress(false, id));
};

export const followThunkCreator = (id: number): ThunkType => {
  return async (dispatch) => {
    await followUnfollowFlow(id, dispatch, usersAPI.follow, actions.follow);
  };
};

export const unfollowThunkCreator = (id: number): ThunkType => {
  return async (dispatch) => {
    await followUnfollowFlow(id, dispatch, usersAPI.unfollow, actions.unfollow);
  };
};
