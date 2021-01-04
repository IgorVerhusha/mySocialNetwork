import React, { Suspense } from "react";
import "./App.scss";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { withRouter, BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import LoginPage from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./Redux/redux-store";
const Music = React.lazy(() => import("./components/Music/Music"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


class App extends React.Component <MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors  (e: PromiseRejectionEvent)  {
    alert("Some error occured")
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }
componentWillMount() {
  window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
}

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
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
            <Suspense fallback={<Preloader />}>
              <Route path="/music" component={Music} />
            </Suspense>
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/settings" component={Settings} />
            <Route path="/login" render={() => <LoginPage />} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}



const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

let SamuraiJsApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJsApp;
