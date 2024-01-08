import React from "react";
import Logo from "./Logo";
import AuthInput from "./AuthInput";
import useLogin from "../hooks/useLogin";
import {
  emailValidationMessage,
  passwordValidationMessage,
} from "modules/validators";

interface ILogin {
  switchAuthHandler: () => void;
}

const Login: React.FC<ILogin> = ({ switchAuthHandler }) => {
  const { state, loginActions, isButtonDisabled } = useLogin();

  return (
    <div className="login-container">
      <Logo text="Login to Twitch" />
      <form className="auth-form">
        <AuthInput
          field="email"
          label="Email"
          type="email"
          value={state.email.value}
          validationMessage={emailValidationMessage}
          showErrorMessage={state.email.showError}
          onChangeHandler={(value) =>
            loginActions.handleInputValueChange("email", value)
          }
          onBlurHandler={(value) =>
            loginActions.handleInputValidationOnBlur("email", value)
          }
        />
        <AuthInput
          field="password"
          label="Password"
          type="password"
          value={state.password.value}
          validationMessage={passwordValidationMessage}
          showErrorMessage={state.password.showError}
          onChangeHandler={(value) =>
            loginActions.handleInputValueChange("password", value)
          }
          onBlurHandler={(value) =>
            loginActions.handleInputValidationOnBlur("password", value)
          }
        />
        <button disabled={!isButtonDisabled} onClick={loginActions.handleLogin}>
          Log in
        </button>
      </form>

      <span className="auth-form-switch-label" onClick={switchAuthHandler}>
        Don't have and account? Sign up
      </span>
    </div>
  );
};

export default Login;
