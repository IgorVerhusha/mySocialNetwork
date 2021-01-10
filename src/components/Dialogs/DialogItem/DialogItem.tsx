import React from "react";
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

type PropsType ={
    id: number
    avatar: string
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.dialog + " " + classes.active}>
            <NavLink to={"/dialogs/" + props.id} activeClassName={classes.active}><div><img src={props.avatar}/></div><div>{props.name}</div></NavLink>
        </div>
    )
}


export default DialogItem;