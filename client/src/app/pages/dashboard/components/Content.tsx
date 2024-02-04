import Channels from "app/features/channels";
import { Outlet, useParams } from "react-router-dom";

const Content = () => {
  return (
    <div className="content-container">
      <Outlet />
    </div>
  );
};

export default Content;
