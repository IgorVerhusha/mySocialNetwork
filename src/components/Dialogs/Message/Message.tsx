import React from "react";
import classes from "./../Dialogs.module.css"


type PropsType ={
    messageText: string
    style: any
}
const Message: React.FC<PropsType>  = (props) => {
    return (
        <div style={props.style} className={classes.message}>
            {props.messageText}
        </div>
    )
}



export default Message;