import React from "react";
import classes from './Friends.module.css';
import FriendItem from "./FriendItem/FriendItem";





// меню с друзьями
const Friends = (props) => {
    let friendElements = props.usersPage.users.map(f => f.followed ? <FriendItem avatar={f.avatar} key={f.id} fullName={f.fullName} followed={f.followed}/> : null)

    return (
    <div className={classes.friendList}>
        <div className={classes.friendHeader}>
            Friends
        </div>
        <div className={classes.friendItems}>
            {friendElements}
        </div>
    </div>
    )
}

export default Friends;