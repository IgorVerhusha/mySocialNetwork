import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/helpFunctions";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET-USERS";
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE";
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";
const SET_PAGINATOR_PAGE = "SET_PAGINATOR_PAGE"


let initialState = {
  users: [],
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
  paginatorPage: 1
};

const usersReducer = (state = initialState, action) => {
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
          : state.followingInProgress.filter((id) => id != action.userId),
      };

    default:
      return state;
  }
};

export let follow = (userId) => ({ type: FOLLOW, userId });
export let unfollow = (userId) => ({ type: UNFOLLOW, userId });
export let setUsers = (users) => ({ type: SET_USERS, users });
export let setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  currentPage: pageNumber,
});
export let setPaginatorPage = (pageNumber) => ({
  type: SET_PAGINATOR_PAGE,
  currentPaginatorPage: pageNumber
})
export let setTotalUsersCount = (totalCount) => ({
  type: SET_TOTAL_USERS_COUNT,
  totalCount: totalCount,
});
export let toggleIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export let toggleIsFollowingProgress = (isFetching, userId) => ({
  type: TOGGLE_IS_FOLLOWING_PROGRESS,
  isFetching,
  userId,
});



export const getUsersThunkCreator = (currentPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let data = await usersAPI.getUsers(currentPage, pageSize)
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));


};


const followUnfollowFlow = async (id, dispatch, followType, actionCreator) => {
  dispatch(toggleIsFollowingProgress(true, id));
  let data = await followType(id)
  if (data.resultCode == 0) {
    dispatch(actionCreator(id));
  }
  dispatch(toggleIsFollowingProgress(false, id));
}


export const followThunkCreator = (id) => (dispatch) => {
  followUnfollowFlow(id, dispatch, usersAPI.follow, follow )
};

export const unfollowThunkCreator = (id) => (dispatch) => {
  followUnfollowFlow(id, dispatch, usersAPI.unfollow, unfollow )
};


export default usersReducer;
