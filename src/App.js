import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import  { withRouter, BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import { compose } from "redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";


class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized){
      return <Preloader/>
    }
    return (
      <BrowserRouter>

        <div className={"app-wrapper"}>
          <HeaderContainer />
          <Nav />
          <div className={"app-wrapper-content"}>
            <Route exact path="/" render={() => <ProfileContainer />} />
            <Route
              exact
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route path="/news" component={News} />
            <Route path="/music" component={Music} />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" render={() => <LoginPage />} />
          </div>
        </div>

      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})


export default compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
