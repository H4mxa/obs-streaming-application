import { Outlet, useParams } from "react-router-dom";
import ChannelCard from "./components/ChannelCard";
import { dummyChannels } from "./core/constants";

import "./styles.css";

const Channels = () => {
  let { id } = useParams();

  return (
    <>
      {id ? (
        <div className="dashboard-container">
          <Outlet />
        </div>
      ) : (
        <div className="channels-container">
          {dummyChannels.map((channel) => {
            return (
              <ChannelCard
                key={channel.id}
                title={channel.title}
                username={channel.username}
                isOnline={channel.isOnline}
                navigateToChannelHandler={() => {}}
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
