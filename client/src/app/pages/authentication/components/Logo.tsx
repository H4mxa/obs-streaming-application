import React from "react";
import logoPlaceholder from "../../../../assets/logoPlaceholder.svg";

interface ILogo {
  text: string;
}

const Logo: React.FC<ILogo> = ({ text }) => {
  return (
    <div className="auth-form-logo-container">
      <img
        style={{
          display: "inline",
        }}
        src={logoPlaceholder}
      />
      <span>&nbsp;{text}</span>
    </div>
  );
};

export default Logo;
