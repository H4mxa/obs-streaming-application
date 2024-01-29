import React from "react";
import { Outlet } from "react-router-dom";

const Content = () => {
  return (
    <div className="content-container">
      <Outlet />
    </div>
  );
};

export default Content;
