import React from "react";
import Header, {DispatchToPropsType, MapPropsType} from "./Header";
import { connect } from "react-redux";
import {authThunkCreator, logoutThunkCreator} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";



class HeaderContainer extends React.Component<MapPropsType & DispatchToPropsType> {
  componentDidMount() {
      this.props.authThunk();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  profileAvatar: state.auth.profileAvatar,
  profileAvatarPath: state.auth.profileAvatarPath,
} ) ;

export default connect<MapPropsType, DispatchToPropsType, {}, AppStateType>(mapStateToProps, {authThunk: authThunkCreator,  logoutThunkCreator })(
  HeaderContainer
);
