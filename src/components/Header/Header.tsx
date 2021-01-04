import React from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

export type MapPropsType = {
    isAuth:boolean
    login:string | null
    profileAvatar: boolean
    profileAvatarPath: string | null
}

export type DispatchToPropsType = {
    logoutThunkCreator: ()=>void
    authThunk: ()=>void
}

const Header:React.FC<MapPropsType & DispatchToPropsType> = (props) => {
    return <header className={classes.header}>
<div className={classes.logo}>
            <a href="/profile"><h1><img src={"/images/logo.png"}/> MySocialNetwork</h1></a>
</div>

            {props.isAuth ? (props.profileAvatar ? <div className={classes.loginContainer}><img src={(() => {if (!props.profileAvatarPath){return "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"} else {return props.profileAvatarPath}})()}/><div className={classes.logOutButton}><button onClick={props.logoutThunkCreator}>Logout</button></div></div>  :  <Preloader/> ) :
            <NavLink to={'/login'}>
                <svg  width="1em" height="1em" viewBox="0 0 16 16" className={"bi bi-key"} fill="currentColor"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd"
                          d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"/>
                    <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                </svg></NavLink>}


    </header>
}
export default Header;
