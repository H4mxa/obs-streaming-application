import { navigateTo } from "app/route/utils";
import Logo from "assets/logoPlaceholder.svg";
import { STORAGE_KEY } from "modules/common/constants";
import { Navigate } from "react-router-dom";

const NavLogo = () => {
  return (
    <div className="nav-logo-container">
      <img className="nav-logo" width={"100%"} height={"100%"} src={Logo} />
    </div>
  );
};

const NavButton = ({
  text,
  onClickHandler,
}: {
  text: string;
  onClickHandler: () => void;
}) => {
  return (
    <span className="nav-button" onClick={onClickHandler}>
      {text}
    </span>
  );
};

const Navbar = () => {
  return (
    <div className="nav-container">
      <NavLogo />
      <div className="nav-buttons-container">
        <NavButton text="Browse" onClickHandler={() => {}} />
        <NavButton text="Login" onClickHandler={() => {}} />
        <div>
          <NavButton text="My Account" onClickHandler={() => {}} />
          <NavButton
            text="Logout"
            onClickHandler={() => {
              localStorage.removeItem(STORAGE_KEY.TOKEN);
              navigateTo("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
