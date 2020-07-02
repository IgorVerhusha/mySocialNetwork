import React from "react";
import classes from './../Friends.module.css';

// иконка с другом
const FriendItem = (props) => {
    return <div className={classes.friendItem}>
        <div>
            <img src={props.avatar}/>
        </div>
        <div>
            {props.fullName}
        </div>
    </div>
}

export default FriendItem;