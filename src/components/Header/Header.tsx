import React, { useEffect } from 'react'
import classes from "./Header.module.css";
import { NavLink } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import { Avatar } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../../Redux/redux-store'
import { authThunkCreator, logoutThunkCreator } from '../../Redux/auth-reducer'



const HeaderProfile: React.FC= (props) => {

  const isAuth = useSelector((state:AppStateType) => state.auth.isAuth)
  const profileAvatar = useSelector((state: AppStateType) => state.auth.profileAvatar)
  const profileAvatarPath = useSelector((state:AppStateType)=>state.auth.profileAvatarPath)

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(authThunkCreator())
  },[])

  return (
    <>
      {isAuth ? (
        profileAvatar ? (
          <div className={classes.loginContainer}>
            <Avatar
              src={(() => {
                if (!profileAvatarPath) {
                  return "https://cs16planet.ru/steam-avatars/images/avatar449.jpg";
                } else {
                  return profileAvatarPath;
                }
              })()}
            />
              <div className={classes.logoutButton} onClick={()=>dispatch(logoutThunkCreator())}>Logout</div>
        </div>
        ) : (
          <Preloader />
        )
      ) : (
        <NavLink to={"/login"}>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className={"bi bi-key"}
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8zm4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5z"
            />
            <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </NavLink>
      )}
    </>
  );
};
export default HeaderProfile;
