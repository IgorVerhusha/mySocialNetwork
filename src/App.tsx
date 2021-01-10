import React, { Suspense } from "react";
import "./App.scss";
import Nav from "./components/Nav/Nav";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import { withRouter, BrowserRouter, Route, NavLink } from 'react-router-dom'
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import Users from "./components/Users/Users";
import LoginPage from "./components/Login/Login";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderProfile from "./components/Header/Header";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, {AppStateType} from "./Redux/redux-store";
import 'antd/dist/antd.css';
import './index.css';
import { Col, Layout, Menu, Row } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  MessageOutlined,
TeamOutlined,
} from '@ant-design/icons';
import classes from './components/Nav/Nav.module.css'
import { ChatPage } from "./pages/ChatPage";

const { Header, Sider, Content } = Layout;


const Music = React.lazy(() => import("./components/Music/Music"));



type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


class App extends React.Component <MapPropsType & DispatchPropsType> {

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

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
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />} >
                <NavLink to={"/profile/"}>
                  Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item key="2" icon={<MessageOutlined />}>
                <NavLink to="/chat">
                  Chat
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<TeamOutlined />}>
                <NavLink to="/users">
                  Users
                </NavLink>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <Row>
                <Col span={21}>
                  {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: this.toggle,
                  })}
                </Col>
                <Col span={3}>
                  <HeaderProfile/>
                </Col>
              </Row>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Route exact path="/" render={() => <ProfileContainer />} />
              <Route
                exact
                path="/profile/:userId?"
                render={() => <ProfileContainer />}
              />
              <Route path="/chat" render={() => <ChatPage />} />
              <Route path="/news" component={News} />
              <Suspense fallback={<Preloader />}>
                <Route path="/music" component={Music} />
              </Suspense>
              <Route path="/users" render={() => <Users />} />
              <Route path="/settings" component={Settings} />
              <Route path="/login" render={() => <LoginPage />} />
            </Content>
          </Layout>
        </Layout>

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
