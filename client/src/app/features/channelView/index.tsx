import LoadingSpinner from "modules/common/components/LoadingSpinner";
import ChannelDescription from "./component/ChannelDescription";
import Chat from "./component/Chat";
import { dummyChannel } from "./core/constants";
import useChannelDetails from "./hooks/useChannelDetails";
import "./styles.css";
import Stream from "./component/Stream";
import { useEffect } from "react";

const ChannelView = () => {
  const {
    loading,
    getIsLoggedIn,
    getChannelDetails,
    getChannelLoading,
    channelDetailsActions,
  } = useChannelDetails();

  if (getChannelLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="channel-container">
      <div className="channel-video-description-section">
        {getChannelDetails?.isOnline ? (
          <Stream streamUrl={getChannelDetails.streamUrl} />
        ) : (
          <div className="channel-offline-placeholder">
            <span> Channel is offline </span>
          </div>
        )}
        {getChannelDetails ? (
          <ChannelDescription
            loading={loading}
            channelId={getChannelDetails.id}
            username={getChannelDetails.username}
            description={getChannelDetails.description}
            title={getChannelDetails.title}
            isLoggedIn={getIsLoggedIn}
            handleFollowChannel={(id) =>
              channelDetailsActions.handleFollowChannel(id)
            }
          />
        ) : null}
      </div>
      <Chat />
    </div>
  );
};

export default ChannelView;
