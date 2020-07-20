import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import {authThunkCreator, setAuthUserData, setProfileAvatar} from "../../Redux/auth-reducer";


class HeaderContainer extends React.Component {
  componentDidMount() {
      this.props.authThunk();
  }

  render() {
    return <Header {...this.props} />;
  }
}

let mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
  profileAvatar: state.auth.profileAvatar,
  profileAvatarPath: state.auth.profileAvatarPath,
});

export default connect(mapStateToProps, { setAuthUserData, setProfileAvatar, authThunk: authThunkCreator })(
  HeaderContainer
);
