interface ChannelDescriptionProps {
  loading: boolean;
  channelId: string;
  title: string;
  description: string;
  username: string;
  isLoggedIn: boolean;
  handleFollowChannel: (id: string) => void;
}

const FollowedButton = ({
  onClick,
  loading,
}: {
  onClick: () => void;
  loading: boolean;
}) => {
  return (
    <button className={"channel-follow-button"} onClick={onClick}>
      {loading ? <span className="follow-button-spinner" /> : "Follow"}
    </button>
  );
};

const ChannelDescription: React.FC<ChannelDescriptionProps> = ({
  loading,
  channelId,
  title,
  description,
  username,
  isLoggedIn,
  handleFollowChannel,
}) => {
  return (
    <div className="channel-description-container">
      <span className="channel-description-title">
        {username}
        {isLoggedIn ? (
          <span>
            <FollowedButton
              loading={loading}
              onClick={() => handleFollowChannel(channelId)}
            />
          </span>
        ) : null}
      </span>

      <span className="channel-description-subtitle">{title}</span>
      <div className="channel-description-box">
        <span className="channel-description">{description}</span>
      </div>
    </div>
  );
};

export default ChannelDescription;
