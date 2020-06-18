import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Profile from "./components/Profile/Profile";
import Dialogs from "./components/Dialogs/Dialogs";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";
import {BrowserRouter, Route} from "react-router-dom";



const App = (props) => {
    return (
        <BrowserRouter>
            <div className={"app-wrapper"}>
                <Header/>
                <Nav/>
                <div className={"app-wrapper-content"}>
                    <Route path="/profile" render={ () => <Profile posts={props.posts}/> }/>
                    <Route path="/dialogs" render={() => <Dialogs dialogs={props.dialogs} messages={props.messages}/> }/>
                    <Route path="/news" component={News}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path="/music" component={Music}/>
                </div>
            </div>
        </BrowserRouter>
    );
}


export default App;
