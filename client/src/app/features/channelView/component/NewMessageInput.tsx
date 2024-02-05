import { useCallback, useState } from "react";

interface INewMessagesInputProps {
  sendMessage: () => void;
}

const NewMessageInput: React.FC<INewMessagesInputProps> = ({ sendMessage }) => {
  const [messageContent, setMessageContent] = useState("");

  const handleValueChange = (e: any) => {
    setMessageContent(e.target.value);
  };

  const handleSendMessage = useCallback(() => {
    sendMessage();
    setMessageContent("");
  }, []);

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-message-input-container" onClick={handleSendMessage}>
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
