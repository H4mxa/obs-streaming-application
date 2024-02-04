import { useBoolean, useEventCallback } from "modules/common/hooks";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { channelActions } from "redux/channel";
import {
  selectChannelDetails,
  selectChannelLoading,
} from "redux/channel/selector";
import { selectIsLoggedIn } from "redux/login/selector";
import { channelService } from "services/channel";

const useChannelDetails = () => {
  const [loading, setLoading] = useBoolean(false);

  const getIsLoggedIn = useSelector(selectIsLoggedIn);
  const getChannelLoading = useSelector(selectChannelLoading);
  const getChannelDetails = useSelector(selectChannelDetails);
  const dispatch = useDispatch();

  const { id } = useParams();
  // ref
  const isMounted = useRef(false);

  useEffect(() => {
    if (!getChannelDetails && !isMounted.current) {
      dispatch(channelActions.processChannelDetails(id));
      isMounted.current = true;
    }
  }, [getChannelDetails]);

  const handleFollowChannel = useEventCallback(async (id: string) => {
    try {
      setLoading.setTrue();
      const body = {
        channelId: id,
      };

      const result = await channelService.postFollowChannel({ body });
      if (result.status >= 200 && result.status < 300) {
        toast.success("Channel Followed successfully");
        dispatch(channelActions.processFollowedChannel());
      }
      setLoading.setFalse();
    } catch (error: any) {
      setLoading.setFalse();
      toast.error(error?.message ?? "Something went wrong");
    }
  });

  const channelDetailsActions = {
    handleFollowChannel,
  };

  return {
    loading,
    getIsLoggedIn,
    getChannelLoading,
    getChannelDetails,
    channelDetailsActions,
  };
};

export default useChannelDetails;
