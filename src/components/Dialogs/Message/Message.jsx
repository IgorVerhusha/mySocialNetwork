import React from "react";
import classes from './../Dialogs.module.css';



const Message = (props) => {
    return (
        <div>
            {props.messageText}
        </div>
    )
}


export default Message;