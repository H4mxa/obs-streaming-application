import ChannelDescription from "./component/ChannelDescription";
import Chat from "./component/Chat";
import { dummyChannel } from "./core/constants";
import "./styles.css";

const ChannelView = () => {
  return (
    <div className="channel-container">
      <div className="channel-video-description-section">
        <div className="channel-offline-placeholder">
          <span> Channel is offline </span>
        </div>
        <ChannelDescription
          channelId={dummyChannel.id}
          username={dummyChannel.username}
          description={dummyChannel.description}
          title={dummyChannel.title}
        />
      </div>
      <Chat />
    </div>
  );
};

export default ChannelView;
