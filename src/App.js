import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import {BrowserRouter, Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import Friends from "./components/Nav/Friends/Friends";



const App = (props) => {

    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Nav />
                <div className={"app-wrapper-content"}>
                    <Route exact path='/' render={() => <Profile/> }/>
                    <Route path="/profile" render={() => <Profile/> }/>
                    <Route path="/dialogs" render={() => <DialogsContainer/> }/>
                    <Route path="/news" component={News}/>
                    <Route path="/music" component={Music}/>
                    <Route path="/users" render={()=> <UsersContainer/> }/>
                    <Route path="/settings" component={Settings}/>

                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
