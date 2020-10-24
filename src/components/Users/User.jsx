import classes from "./Users.module.css";
import {NavLink} from "react-router-dom";
import React from "react";


const User = (props) => {

   return ( <div className={classes.card}>
        <div className={classes.picture}>
            <NavLink to={"/profile/" + props.user.id}>
                <img
                    src={
                        props.user.photos.small != null
                            ? props.user.photos.small
                            : "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"
                    }
                />
            </NavLink>

            <div>
                {props.user.followed ? (
                    <button
                        disabled={props.followingInProgress.some((id) => id === props.user.id)}
                        onClick={() => {
                            props.unfollow(props.user.id);
                        }}
                    >
                        unfollow
                    </button>
                ) : (
                    <button
                        disabled={props.followingInProgress.some((id) => id === props.user.id)}
                        onClick={() => {
                            props.follow(props.user.id);
                        }}
                    >
                        follow
                    </button>
                )}
            </div>
        </div>
        <div>
            <div className={classes.discription}>
                <div>{props.user.name}</div>
                <div>{props.user.status}</div>
            </div>
        </div>
    </div>
   )
}

export default User