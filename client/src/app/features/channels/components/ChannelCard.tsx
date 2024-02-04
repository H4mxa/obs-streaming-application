import { DEFAULT_IMAGE } from "../core/constants";

interface ChannelCardProps {
  title: string;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  navigateToChannelHandler: () => void;
}

const ChannelAvatar: React.FC<Pick<ChannelCardProps, "avatarUrl">> = ({
  avatarUrl,
}) => {
  return (
    <div>
      <img
        src={avatarUrl || DEFAULT_IMAGE}
        alt="channel_avatar"
        width={"100%"}
        height={"100%"}
        style={{ maxHeight: "220px", minHeight: "220px" }}
      />
    </div>
  );
};

const ChannelCard: React.FC<ChannelCardProps> = ({
  title,
  username,
  avatarUrl,
  isOnline,
  navigateToChannelHandler,
}) => {
  return (
    <div className="channels-card" onClick={() => navigateToChannelHandler()}>
      <ChannelAvatar avatarUrl={avatarUrl} />
      <span className="channel-card-title">{title}</span>
      <span className="channel-card-text">{username}</span>
      <span
        className="channel-card-text"
        style={{
          color: isOnline ? "green" : "red",
        }}
      >
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
};

export default ChannelCard;
