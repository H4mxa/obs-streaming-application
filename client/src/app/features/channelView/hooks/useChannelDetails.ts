import { STORAGE_KEY } from "modules/common/constants";
import { useBoolean, useEventCallback } from "modules/common/hooks";
import { AuthenticationHelper } from "modules/helper/authentication";
import { useEffect } from "react";
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

  useEffect(() => {
    // if (!getChannelDetails && !isMounted.current) {
    dispatch(channelActions.processChannelDetails(id));
    //   isMounted.current = true;
    // }
  }, []);

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
    userDetails: getIsLoggedIn ? AuthenticationHelper.getUserDetails() : {},
    channelId: id,
    getIsLoggedIn,
    getChannelLoading,
    getChannelDetails,
    channelDetailsActions,
  };
};

export default useChannelDetails;
