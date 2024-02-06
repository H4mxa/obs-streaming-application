import { useCallback, useState } from "react";

interface INewMessagesInputProps {
  sendMessage: (message: string) => void;
}

const NewMessageInput: React.FC<INewMessagesInputProps> = ({ sendMessage }) => {
  const [messageContent, setMessageContent] = useState("");

  const handleValueChange = (e: any) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(messageContent);
    setMessageContent("");
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-message-input-container">
      <input
        type="text"
        className="chat-message-input"
        placeholder="Type message..."
        value={messageContent}
        onChange={handleValueChange}
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default NewMessageInput;
