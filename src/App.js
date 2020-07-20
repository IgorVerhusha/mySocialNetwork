import React from "react";
import "./App.css";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";

const App = (props) => {
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
};

export default App;
