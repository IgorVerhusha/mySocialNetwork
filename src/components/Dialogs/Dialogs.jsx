import React from "react";
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

const Dialogs = (props) => {
    // преобразовываем полученный массив с диалогами в компоненту список диалогов
    let dialogsElements = props.dialogs.map(d => <DialogItem name={d.name} id={d.id}/>);

    //  преобразовавыем массив с сообщениями в компоненту список сообщений
    let messageElements = props.messages.map(m => <Message messageText={m.message}/>)

    // отрисовываем страницу диалогов
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messageItems}>
                {messageElements}
            </div>
        </div>

    )
}

export default Dialogs;