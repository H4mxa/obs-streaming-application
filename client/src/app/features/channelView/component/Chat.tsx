import Messages from "./Messages";
import NewMessageInput from "./NewMessageInput";

interface IChatProps {
  channelId: string;
}

const messages = [
  {
    author: "<NAME>",
    content: "Hello World",
    id: 1,
  },
  {
    id: 2,

    author: "<NAME>",
    content: "Hello World",
  },
  {
    id: 3,

    author: "<NAME>",
    content: "Hello World",
  },
];

const Chat: React.FC<IChatProps> = ({ channelId }) => {
  return (
    <div className="chat-section">
      <div className="chat-title-container">
        <span className="chat-title-text">Stream Chat</span>
      </div>

      <Messages messages={messages} />
      <NewMessageInput sendMessage={() => {}} />
    </div>
  );
};

export default Chat;
