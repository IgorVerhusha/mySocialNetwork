import React from "react";
import classes from "./Users.module.css";
import { NavLink } from "react-router-dom";


let Users = (props) => {

  let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

  let pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div className={classes.pagesCount}>
        {pages.map((p) => {
          return (
            <span
              className={
                props.currentPage === p ? classes.selectedPage : classes
              }
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          );
        })}
      </div>
      {props.users.map((u, index) => (
        <div key={u.id} className={classes.card}>
          <div className={classes.picture}>
            <NavLink to={"/profile/" + u.id}>
              <img
                src={
                  u.photos.small != null
                    ? u.photos.small
                    : "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"
                }
              />
            </NavLink>

            <div>
              {u.followed ? (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.unfollowThunk(u.id);
                  }}
                >
                  unfollow
                </button>
              ) : (
                <button
                  disabled={props.followingInProgress.some((id) => id === u.id)}
                  onClick={() => {
                    props.followThunk(u.id);
                  }}
                >
                  follow
                </button>
              )}

            </div>
          </div>
          <div>
            <div className={classes.discription}>
              <div>{u.name}</div>
              <div>{u.status}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

// style={ (() => {switch (u.id){
//     case 9211 : return {background: 'green'};
//     case 9210 : return {background: 'blue'};
//     default : return {background: 'white'}
// }})()
//
//
// }
