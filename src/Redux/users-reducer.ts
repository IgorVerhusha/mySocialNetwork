import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpFunctions";
import { photosType, userType } from "./types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_PAGINATOR_PAGE = "SET_PAGINATOR_PAGE"



type initialState = typeof initialState




let initialState = {
  users: [] as Array<userType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  paginatorPage: 1
};

const usersReducer = (state = initialState, action: any):initialState => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
      };
    case SET_USERS:
      return {
        ...state,
        users: action.users,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case SET_PAGINATOR_PAGE:
      return {
        ...state,
        paginatorPage: action.currentPaginatorPage
      }
    case SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.totalCount,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id:number) => id != action.userId) as Array<number>,
      } ;

    default:
      return state;
  }
};

export default usersReducer;

type followActionType = {
  type: typeof FOLLOW
  userId: number
}
export let follow = (userId:number):followActionType => ({ type: FOLLOW, userId });
type unfollowActionType = {
  type: typeof UNFOLLOW
  userId: number
}
export let unfollow = (userId:number):unfollowActionType => ({ type: UNFOLLOW, userId });
type setUsersActionType = {
  type: typeof SET_USERS
  users: Array<userType>
}
export let setUsers = (users: Array<userType>): setUsersActionType => ({ type: SET_USERS, users });
type setCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export let setCurrentPage = (pageNumber:number):setCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage: pageNumber,
});
type setPaginatorPageActionType = {
  type: typeof SET_PAGINATOR_PAGE
  currentPaginatorPage: number
}
export let setPaginatorPage = (pageNumber:number):setPaginatorPageActionType => ({
  type: SET_PAGINATOR_PAGE,
  currentPaginatorPage: pageNumber
})
type setTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  totalCount: number
}
export let setTotalUsersCount = (totalCount:number):setTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount: totalCount,
});
type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export let toggleIsFetching = (isFetching:boolean):toggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
type toggleIsFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export let toggleIsFollowingProgress = (isFetching:boolean, userId:number):toggleIsFollowingProgressActionType => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});



export const getUsersThunkCreator = (currentPage:number, pageSize:number) => async (dispatch:any) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize)
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));


};


const followUnfollowFlow = async (id:number, dispatch:any, followType:any, actionCreator:any) => {
  dispatch(toggleIsFollowingProgress(true, id));
  let data = await followType(id)
  if (data.resultCode == 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleIsFollowingProgress(false, id));
}


export const followThunkCreator = (id:number) => (dispatch:any) => {
  followUnfollowFlow(id, dispatch, usersAPI.follow, follow )
};

export const unfollowThunkCreator = (id:number) => (dispatch:any) => {
  followUnfollowFlow(id, dispatch, usersAPI.unfollow, unfollow )
};



