import React from "react";
import classes from './Dialogs.module.css';
import Dialog from "./DialogItem/DialogItem";
import Message from "./Message/Message";




const Dialogs = (props) => {
    // сохраняем данные инпута сообщения
    let newMessageElement = React.createRef();
    let onSendMessage = () => {
        if (props.messagesPage.newMessageText != ''){
            props.sendMessage();
        }
    }

    let onMessageChange = () => {
        let text = newMessageElement.current.value;
       props.onMessageChange(text)
    }


    // преобразовываем полученный массив с диалогами в компоненту список диалогов
    let dialogsElements = props.messagesPage.dialogs.map(d => <Dialog name={d.name} key={d.id} id={d.id} avatar={d.avatar}/>);

    //  преобразовавыем массив с сообщениями в компоненту список сообщений
    let messageElements = props.messagesPage.messages.map(m => <Message messageText={m.message} key={m.id} style={m.style}/>)

    // отрисовываем страницу диалогов
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                {dialogsElements}
            </div>
            <div className={classes.messageItems}>
                <div>
                    {messageElements}
                </div>
                <div className={classes.inputMessage}>
                    <textarea className="form-control"   aria-label="With textarea"  ref={newMessageElement} value={props.messagesPage.newMessageText} onChange={onMessageChange}></textarea>
                    <button type="button" className="btn btn-info" onClick={onSendMessage}>Send</button>
                </div>
            </div>
        </div>

    )
}

export default Dialogs;