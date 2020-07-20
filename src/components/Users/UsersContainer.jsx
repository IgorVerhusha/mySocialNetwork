import React from "react";
import { connect } from "react-redux";
import {
    follow,
    followThunkCreator,
    getUsersThunkCreator,
    setCurrentPage,
    setTotalUsersCount,
    setUsers, startDialogTC,
    toggleIsFetching,
    toggleIsFollowingProgress,
    unfollow,
    unfollowThunkCreator,
} from "../../Redux/users-reducer";
import Users from "./Users.js";
import Preloader from "../common/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

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
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            followingInProgress={this.props.followingInProgress}
            followThunk={this.props.followThunk}
            unfollowThunk={this.props.unfollowThunk}
          />
        )}
      </>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

export default compose(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
    getUsers: getUsersThunkCreator,
    followThunk: followThunkCreator,
    unfollowThunk: unfollowThunkCreator
  }),
  withAuthRedirect
)(UsersContainer);
