import { useEventCallback } from "modules/common/hooks";
import { useDispatch, useSelector } from "react-redux";
import { channelActions } from "redux/channel";
import {
  selectChannelLoading,
  selectChannels,
  selectFollowedChannel,
} from "redux/channel/selector";
import { selectIsLoggedIn } from "redux/login/selector";

const useChannel = () => {
  // selectors
  const getChannels = useSelector(selectChannels);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const getChannelLoading = useSelector(selectChannelLoading);
  const getFollowedChannel = useSelector(selectFollowedChannel);

  // hooks
  const dispatch = useDispatch();

  const fetchFollowedChannel = useEventCallback(() => {
    if (isLoggedIn) {
      dispatch(channelActions.processFollowedChannel());
    }
  });

  const channelsMethods = {
    fetchFollowedChannel,
  };

  return {
    isLoggedIn,
    channelsMethods,
    getChannelLoading,
    channels: getChannels,
    followedChannels: getChannels?.filter(
      (channel) => getFollowedChannel?.includes(channel.id)
    ),
  };
};

export default useChannel;
