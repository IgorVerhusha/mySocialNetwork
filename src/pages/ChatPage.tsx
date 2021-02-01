import { Button } from "antd";
import React, { useEffect, useState } from "react";

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: number;
  userName: string;
};

export const ChatPage: React.FC = () => {
  const [wsChannel, setWSChannel] = useState<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    const closeHandler = () => {
      console.log("CLOSE WS");
      setTimeout(createChannel, 3000);
    };
    const createChannel = () => {
      if (ws != null) {
        ws.removeEventListener("close", closeHandler);
        ws.close();
      }
      ws = new WebSocket(
        "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
      );
      ws?.addEventListener("close", closeHandler);
      setWSChannel(ws);
    };
    createChannel();

    return () => {
      ws.removeEventListener("close", closeHandler);
      ws.close();
    };
  }, []);

  return (
    <div>
      <Messages ws={wsChannel} />
      <AddMessageForm ws={wsChannel} />
    </div>
  );
};

const Messages: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);



  useEffect(() => {
    let messageHandler = (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }
    ws?.addEventListener("message", messageHandler);
    return ()=>{
      ws?.removeEventListener("message", messageHandler)
    }
  }, [ws]);

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      {messages.map((item, index) => (
        <Message key={`${item.userId}_${index}`} message={item} />
      ))}
    </div>
  );
};

const Message: React.FC<{ message: ChatMessageType }> = ({ message }) => {
  return (
    <div>
      <img style={{ width: "30px" }} src={message.photo} />
      <b>{message.userName}</b>
      <br />
      {message.message}
      <br />
    </div>
  );
};

const AddMessageForm: React.FC<{ ws: WebSocket | null }> = ({ ws }) => {
  const [message, setMessage] = useState("");
  const [readyStatus, setReadyStatus] = useState<"pending" | "ready">(
    "pending"
  );
  const sendMessage = () => {
    if (!message) {
      return;
    }
    ws?.send(message);
    setMessage("");
  };

  useEffect(() => {
    const openHandler = () => {
      setReadyStatus("ready");
    };
    ws?.addEventListener("open", openHandler);
    return () => {
      ws?.removeEventListener("open", openHandler);
    };
  }, [ws]);

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
          disabled={ws == null || readyStatus !== "ready"}
          onClick={sendMessage}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPage;
