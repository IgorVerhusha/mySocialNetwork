import {Button} from 'antd'
import React, {useEffect, useRef, useState} from 'react'
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

    const status = useSelector((state: AppStateType) => state.chat.status)
    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            {status === 'error' && (
                <div>Some error occurred. Please refresh the page</div>
            )}
            <Messages/>
            <AddMessageForm/>
        </div>
    )
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.round(element.scrollHeight - element.scrollTop) === element.clientHeight){
            setIsAutoScroll(true)
        } else {setIsAutoScroll(false)}
    }
    React.useEffect(()=> {
     if (isAutoScroll) messagesAnchorRef.current?.scrollTo(0, 99999) }, [messages]
    );
    return (
        <div style={{height: '400px', overflow: 'auto'}} ref={messagesAnchorRef} onScroll={scrollHandler}>
            {messages.map((item, index) => (
                <Message key={`${item.userId}_${index}`} message={item}/>
            ))}
        </div>
    )
}

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return (
        <div>
            <img style={{width: '30px'}} src={message.photo}/>
            <b>{message.userName}</b>
            <br/>
            {message.message}
            <br/>
        </div>
    )
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const status = useSelector((state: AppStateType) => state.chat.status)
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
                <Button disabled={status !== 'ready'} onClick={sendMessageHandler}>
                    Send
                </Button>
            </div>
        </div>
    )
}

export default ChatPage
