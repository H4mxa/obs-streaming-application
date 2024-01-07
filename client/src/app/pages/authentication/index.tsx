import React, { useCallback, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import "./styles.css";

const Authentication = () => {
  const [isLogin, setLogin] = useState(true);

  const handleAuthenticationPageToggle = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  return (
    <div className="auth-container">
      {isLogin ? (
        <Login switchAuthHandler={handleAuthenticationPageToggle} />
      ) : (
        <Register switchAuthHandler={handleAuthenticationPageToggle} />
      )}
    </div>
  );
};

export default Authentication;
