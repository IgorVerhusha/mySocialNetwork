import React from "react";
import classes from "./Dialogs.module.css";
import Dialog from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageReduxForm from "./SendMessageForm";




const Dialogs = (props) => {


  let addNewMessage = (values) => {
      if (values.newMessageBody !== undefined) {
          props.sendMessage(values.newMessageBody)
      }
 };


  // преобразовываем полученный массив с диалогами в компоненту список диалогов
  let dialogsElements = props.messagesPage.dialogs.map((d) => (
    <Dialog name={d.name} key={d.id} id={d.id} avatar={d.avatar} />
  ));

  //  преобразовавыем массив с сообщениями в компоненту список сообщений
  let messageElements = props.messagesPage.messages.map((m) => (
    <Message messageText={m.message} key={m.id} style={m.style} />
  ));

  // отрисовываем страницу диалогов
  return (
    <div className={classes.dialogs}>
      <div className={classes.dialogItems}>{dialogsElements}</div>
      <div className={classes.messageItems}>
        <div>{messageElements}</div>
        <AddMessageReduxForm onSubmit={addNewMessage}/>
      </div>
    </div>
  );
};

export default Dialogs;
