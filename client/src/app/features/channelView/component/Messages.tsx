import React from "react";

interface IMessagesProps {
  messages: any[];
}

interface IMessageProps {
  author: string;
  content: string;
}

const Message: React.FC<IMessageProps> = ({ author, content }) => {
  return (
    <span className="chat-messages-message">
      <span
        style={{
          fontWeight: "bold",
        }}
      >
        {author}:{" "}
      </span>
      {content}
    </span>
  );
};

const Messages: React.FC<IMessagesProps> = ({ messages }) => {
  return (
    <div className="chat-messages-container">
      {messages.map((message, idx) => (
        <Message key={idx} author={message.author} content={message.content} />
      ))}
    </div>
  );
};

export default Messages;
