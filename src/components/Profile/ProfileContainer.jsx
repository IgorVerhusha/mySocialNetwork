import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  setUserProfile,
  updateStatusThunkCreator,
} from "../../Redux/profile-reducer";
import {withRouter} from "react-router-dom";

import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.props.getProfile(this.props.authorizedUserId);
    }
    if (this.props.authorizedUserId !== prevProps.authorizedUserId) {
      this.props.getProfile(this.props.authorizedUserId);
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
      />
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    setUserProfile,
    getProfile: getProfileThunkCreator,
    getStatus: getStatusThunkCreator,
    updateStatus: updateStatusThunkCreator,
  }),
  withRouter
)(ProfileContainer);
