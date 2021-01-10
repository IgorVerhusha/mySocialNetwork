import { Button } from 'antd'
import React, { useEffect, useState } from 'react'


const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

export type ChatMessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}


export const ChatPage: React.FC = () => {
  return (
    <div>
      <Messages/>
      <AddMessageForm/>
    </div>
  )
}


const Messages: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  useEffect(()=>{

    ws.addEventListener("message", (e)=>{
      const newMessages = JSON.parse(e.data)
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    })
  },[])

  return (
    <div style={{height: '400px', overflow: 'auto'}}>
      {messages.map((item, index)=> <Message key={`${item.userId}_${index}`} message={item}/>)}
    </div>
  )
}


const Message:React.FC <{message:ChatMessageType}> = ({message}) => {

  return (
    <div>
<img style={{width: '30px'}} src={message.photo}/><b>{message.userName}</b>
      <br/>
      {message.message}
      <br/>
    </div>
  )
}



const AddMessageForm: React.FC = () => {
  const [message, setMessage] = useState('')
  const sendMessage = () => {
if(!message){
  return
}ws.send(message)
    setMessage('')
  }
  return (
    <div>
      <div>
        <textarea onChange={(e)=>setMessage(e.target.value) } value={message}/>
      </div>
      <div>
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  )
}

export default ChatPage
