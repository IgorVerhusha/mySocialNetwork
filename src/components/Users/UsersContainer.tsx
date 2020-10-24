import React from "react";
import { connect } from "react-redux"
import {
  followThunkCreator,
  getUsersThunkCreator,
  setCurrentPage,
  setPaginatorPage,
  unfollowThunkCreator,
} from "../../Redux/users-reducer"
import Users from "./Users"
import { compose } from "redux"
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getPaginatorPage,
  getTotalUsersCount,
  getUsers,
} from "../../Redux/users-selectors"
import {userType} from "../../Redux/types/types"
import { AppStateType } from "../../Redux/redux-store";

type MapStateToPropsType = {
    currentPage:number
    pageSize:number
    totalUsersCount: number
    paginatorPage:number
    users: Array<userType>
    isFetching: boolean
    followingInProgress: Array<number>
}

type MapDispatchToPropsType={
    getUsers:(currentPage:number, pageSize:number) => void
    setCurrentPage: (pageNumber:number)=>void
    setPaginatorPage: (pageNumber:number)=>void
    followThunk: (id:number)=>void
    unfollowThunk: (id:number)=>void
}

type OwnStateProps={

}
type PropsType= MapStateToPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize)
  }

  onPageChanged = (pageNumber:number) => {
    this.props.getUsers(pageNumber, this.props.pageSize)
    this.props.setCurrentPage(pageNumber)
  };

  render() {
    return (
      <>
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          paginatorPage={this.props.paginatorPage}
          onPageChanged={this.onPageChanged}
          setPaginatorPage={this.props.setPaginatorPage}
          users={this.props.users}
          followingInProgress={this.props.followingInProgress}
          followThunk={this.props.followThunk}
          unfollowThunk={this.props.unfollowThunk}
          isFetching={this.props.isFetching}
        />
      </>
    )
  }
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    paginatorPage: getPaginatorPage(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, OwnStateProps, AppStateType>(mapStateToProps, {
    setCurrentPage,
    setPaginatorPage,
    getUsers: getUsersThunkCreator,
    followThunk: followThunkCreator,
    unfollowThunk: unfollowThunkCreator,
  })
)(UsersContainer)



