import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {userType} from "../../Redux/types/types";
import { useDispatch } from 'react-redux'


type PropsType = {
    user: userType
    followingInProgress: Array<number>
        follow: (id:number)=>void
    unfollow: (id:number)=>void
}

const User: React.FC<PropsType> = ({user, followingInProgress, follow, unfollow}) => {


   return ( <div className={classes.card}>
        <div className={classes.picture}>
            <NavLink to={"/profile/" + user.id}>
                <img
                    src={
                        user.photos.small != null
                            ? user.photos.small
                            : "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"
                    }
                />
            </NavLink>

            <div>
                {user.followed ? (
                    <button
                        disabled={followingInProgress.some((id) => id === user.id)}
                        onClick={() => {
                            unfollow(user.id);
                        }}
                    >
                        unfollow
                    </button>
                ) : (
                    <button
                        disabled={followingInProgress.some((id) => id === user.id)}
                        onClick={() => {
                            follow(user.id);
                        }}
                    >
                        follow
                    </button>
                )}
            </div>
        </div>
        <div>
            <div className={classes.discription}>
                <div>{user.name}</div>
                <div>{user.status}</div>
            </div>
        </div>
    </div>
   )
}

export default User