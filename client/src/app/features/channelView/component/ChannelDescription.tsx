interface ChannelDescriptionProps {
  channelId: number | string;
  title: string;
  description: string;
  username: string;
}

const ChannelDescription: React.FC<ChannelDescriptionProps> = ({
  channelId,
  title,
  description,
  username,
}) => {
  return (
    <div className="channel-description-container">
      <span className="channel-description-title">{username}</span>
      <span className="channel-description-subtitle">{title}</span>
      <div className="channel-description-box">
        <span className="channel-description">{description}</span>
      </div>
    </div>
  );
};

export default ChannelDescription;
