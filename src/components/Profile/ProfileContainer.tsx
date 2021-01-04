import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getProfileThunkCreator,
  getStatusThunkCreator,
  updateStatusThunkCreator,
  savePhoto, saveProfile, actions
} from "../../Redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import { compose } from "redux";
import {AppStateType} from "../../Redux/redux-store";
import { profileType } from "../../Redux/types/types";


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  setUserProfile: (userId: number)=> void
  getProfile: (userId: number)=> void
  getStatus: (userId: number)=> void
  updateStatus: (status: string)=> void
  savePhoto: (file: File)=> void
  saveProfile: (profile: profileType)=> Promise<any>
}
type PathParamsType = {
  userId: string
}


type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile(){
    let userId: number | null = +this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getProfile(userId as number);
    this.props.getStatus(userId as number);
  }

  componentDidMount() {
this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
    if (this.props.authorizedUserId !== prevProps.authorizedUserId) {
      this.refreshProfile()
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        isOwner={!this.props.match.params.userId}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    setUserProfile: actions.setUserProfile,
    getProfile: getProfileThunkCreator,
    getStatus: getStatusThunkCreator,
    updateStatus: updateStatusThunkCreator,
    savePhoto,
    saveProfile
  }),
  withRouter
)(ProfileContainer);
