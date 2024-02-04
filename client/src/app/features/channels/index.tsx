import { Outlet, useParams } from "react-router-dom";
import ChannelCard from "./components/ChannelCard";
import useChannel from "./hooks/useChannel";
import { navigateTo } from "app/route/utils";
import "./styles.css";

const Channels = () => {
  let { id } = useParams();
  const { channels } = useChannel();

  return (
    <>
      {id ? (
        <div className="dashboard-container">
          <Outlet />
        </div>
      ) : (
        <div className="channels-container">
          {channels &&
            channels.map((channel) => {
              return (
                <ChannelCard
                  key={channel.id}
                  title={channel.title}
                  username={channel.username}
                  isOnline={channel.isOnline}
                  navigateToChannelHandler={() => navigateTo(`${channel.id}`)}
                  avatarUrl={channel.avatarUrl}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default Channels;
