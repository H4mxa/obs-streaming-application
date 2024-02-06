import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";
import useSocket from "modules/common/hooks/useSocket";
import { Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import { IO_EVENTS } from "modules/common/constants";
import { IMessageData } from "../types";
import toast from "react-hot-toast";

interface IChatProps {
  channelId: string;
  username: string;
  isLoggedIn: boolean;
}

const Chat: React.FC<IChatProps> = ({ channelId, username, isLoggedIn }) => {
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(messages);
  messagesRef.current = messages;

  const socket: Socket | null = useSocket();

  useEffect(() => {
    if (socket) {
      socket.emit(IO_EVENTS.CHAT_HISTORY, channelId);

      socket.on(IO_EVENTS.CHAT_HISTORY, (data: any) => {
        setMessages(data?.messages);
      });

      socket.on(IO_EVENTS.CHAT_MESSAGE, (data: any) => {
        debugger;
        const payload: any = [...messagesRef.current];
        payload.push({
          author: data?.message?.author,
          content: data?.message?.content,
        });

        setMessages(payload);
      });

      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const sendMessage = (text: string) => {
    if (!isLoggedIn) {
      toast.error("Please login to send message");
      return;
    }
    if (socket) {
      socket.emit(IO_EVENTS.CHAT_MESSAGE, {
        toChanneL: channelId,
        message: {
          author: username,
          content: text,
        },
      } as IMessageData);
    }
  };

  return (
    <div className="chat-section">
      <div className="chat-title-container">
        <span className="chat-title-text">Stream Chat</span>
      </div>

      <Messages messages={messages} />
      <NewMessageInput sendMessage={(text) => sendMessage(text)} />
    </div>
  );
};

export default Chat;
