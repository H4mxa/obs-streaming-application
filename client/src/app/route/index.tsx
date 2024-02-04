import { RouterProvider } from "react-router-dom";
import Router from "./appRoutes";
import { loginActions, useLoginSlice } from "redux/login";
import { useChannelSlice } from "redux/channel";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const Navigation = () => {
  useLoginSlice();
  useChannelSlice();

  const dispatch = useDispatch();
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      dispatch(loginActions.processInitApp());
      isMounted.current = false;
    }
  }, []);

  return <RouterProvider router={Router} />;
};

export default Navigation;
