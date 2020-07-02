import React from "react";
import {changeNewMessageTextActionCreator, sendMessageActionCreator} from "../../Redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";



let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage
    }
}

let mapDispatchToProps = (dispatch)=>{
    return {
        sendMessage: ()=>{
            dispatch(sendMessageActionCreator());
        },
        onMessageChange: (text)=>{
            dispatch(changeNewMessageTextActionCreator(text))
        }
    }
}

const DialogsContainer = connect (mapStateToProps, mapDispatchToProps)(Dialogs);


export default DialogsContainer;