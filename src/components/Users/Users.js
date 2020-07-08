import React from "react";
import classes from "./Users.module.css"
import {NavLink} from "react-router-dom";
import * as axios from "axios";


let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div className={classes.pagesCount}>
            {pages.map(p => {
                return <span className={props.currentPage === p ? classes.selectedPage : classes} onClick={() => {
                    props.onPageChanged(p)
                }}>{p}</span>
            })}
        </div>
        {
            props.users.map(u => <div key={u.id} className={classes.card}>
                <div className={classes.picture}>
                    <div className={classes.avatar}>
                        <NavLink to={'/profile/' + u.id}><img
                            src={u.photos.small != null ? u.photos.small : "https://cs16planet.ru/steam-avatars/images/avatar449.jpg"}/></NavLink>
                    </div>
                    <div>
                        {u.followed ? <button onClick={() => {
                            debugger
                                axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/` + u.id, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "c965f834-d3e0-4bed-acd7-7832ade2de5a"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.unfollow(u.id);
                                        }
                                    });
                            }}>unfollow</button> :
                            <button onClick={() => {
                                axios.post(`https://social-network.samuraijs.com/api/1.0/follow/` + u.id, {}, {
                                    withCredentials: true,
                                    headers: {
                                        "API-KEY": "c965f834-d3e0-4bed-acd7-7832ade2de5a"
                                    }
                                })
                                    .then(response => {
                                        if (response.data.resultCode == 0) {
                                            props.follow(u.id);
                                        }
                                    });
                            }}>follow</button>}
                    </div>
                </div>
                <div>
                    <div className={classes.discription}>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                    </div>
                </div>
            </div>)
        }
    </div>
}

export default Users