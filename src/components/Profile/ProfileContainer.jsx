import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  setUserProfile, updateStatusThunkCreator,
} from "../../Redux/profile-reducer";
import { withRouter } from "react-router-dom";


import { compose } from "redux";

class ProfileContainer extends React.Component {
  componentDidMount() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = 7424;
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId)
  }

  componentDidUpdate(prevProps) {

    // Популярный пример (не забудьте сравнить пропсы):
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.props.getProfile(7424);
    }
  }

  render() {
    return <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateStatus={this.props.updateStatus}/>;
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status
});

export default compose(
  connect(mapStateToProps, {
    setUserProfile,
    getProfile: getProfileThunkCreator,
    getStatus: getStatusThunkCreator,
    updateStatus: updateStatusThunkCreator
  }),

  withRouter
)(ProfileContainer);
