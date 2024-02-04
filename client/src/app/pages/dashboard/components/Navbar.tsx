import { navigateTo } from "app/route/utils";
import Logo from "assets/logoPlaceholder.svg";
import { STORAGE_KEY } from "modules/common/constants";
import useUserDetail from "modules/common/hooks/useUserDetail";
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
  const { isLogged, logout } = useUserDetail();

  return (
    <div className="nav-container">
      <NavLogo />
      <div className="nav-buttons-container">
        <NavButton text="Browse" onClickHandler={() => navigateTo("/")} />
        {!isLogged ? (
          <NavButton text="Login" onClickHandler={() => navigateTo("/login")} />
        ) : (
          <div>
            <NavButton
              text="My Account"
              onClickHandler={() => navigateTo("/settings")}
            />
            <NavButton text="Logout" onClickHandler={logout} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
