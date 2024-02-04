import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { channelActions } from "redux/channel";
import {
  selectChannelDetails,
  selectChannelLoading,
} from "redux/channel/selector";

const useChannelDetails = () => {
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

  return {
    getChannelLoading,
    getChannelDetails,
  };
};

export default useChannelDetails;
