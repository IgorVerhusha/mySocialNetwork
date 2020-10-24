import React from "react";
import { connect } from "react-redux";
import {
    follow,
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage, setPaginatorPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unfollow,
    unfollowThunkCreator,
} from "../../Redux/users-reducer";
import Users from "./Users.js";
import { compose } from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize, getPaginatorPage,

    getTotalUsersCount,
    getUsers,
} from "../../Redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
    this.props.setCurrentPage(pageNumber);
  };



  render() {
    return (
      <>

          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            portionSize = {this.props.portionSize}
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
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
      paginatorPage: getPaginatorPage(state)
  };
};

export default compose(
  connect(mapStateToProps, {

    setUsers,
    setCurrentPage,
      setPaginatorPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
    getUsers: getUsersThunkCreator,
    followThunk: followThunkCreator,
    unfollowThunk: unfollowThunkCreator,
  })
)(UsersContainer);
