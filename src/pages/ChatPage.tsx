import {Button} from 'antd'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    sendMessage,
    startMessagesListening,
    stopMessagesListening,
} from '../Redux/chat-reducer'
import {AppStateType} from '../Redux/redux-store'

export type ChatMessageType = {
    message: string;
    photo: string;
    userId: number;
    userName: string;
};

export const ChatPage: React.FC = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)

    return (
        <div style={{height: '400px', overflow: 'auto'}}>
            {messages.map((item, index) => (
                <Message key={`${item.userId}_${index}`} message={item}/>
            ))}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = ({message}) => {
    return (
        <div>
            <img style={{width: '30px'}} src={message.photo}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <br/>
        </div>
    )
}

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>(
        'pending'
    )
    const dispatch = useDispatch()
    const sendMessageHandler = () => {
        if (!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }


    return (
        <div>
            <div>
        <textarea
            onChange={(e) => setMessage(e.target.value)}
            value={message}
        />
            </div>
            <div>
                <Button
                    onClick={sendMessageHandler}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

export default ChatPage