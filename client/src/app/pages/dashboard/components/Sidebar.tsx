const followedChannels = [
  {
    id: 1,
    username: "h4mxa",
    isOnline: false,
  },
  {
    id: 2,
    username: "xCode",
    isOnline: true,
  },
  {
    id: 3,
    username: "l33t",
    isOnline: false,
  },
];

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <span className="sidebar-title">For you</span>
      <span className="sidebar-subtitle">FOLLOWED CHANNEL</span>
      {followedChannels.map((channel) => {
        return (
          <div className="sidebar-list-item" key={channel.id}>
            <span className="sidebar-list-username">{channel.username}</span>
            <span
              className="sidebar-list-status"
              style={{
                color: channel.isOnline ? "green" : "red",
              }}
            >
              {channel.isOnline ? "Online" : "Offline"}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;
