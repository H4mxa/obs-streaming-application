import React from "react";
import Logo from "./Logo";
import AuthInput from "./AuthInput";
import useRegister from "../hooks/useRegister";
import {
  emailValidationMessage,
  passwordConfValidationMessage,
  passwordValidationMessage,
  usernameValidationMessage,
} from "modules/validators";

interface IRegister {
  switchAuthHandler: () => void;
}

const Register: React.FC<IRegister> = ({ switchAuthHandler }) => {
  const { state, registerActions } = useRegister();
  return (
    <div className="register-container">
      <Logo text="Sign up to Twitch" />
      <form className="auth-form">
        <AuthInput
          field="email"
          label="Email"
          type="text"
          value={state.email.value}
          validationMessage={emailValidationMessage}
          showErrorMessage={state.email.showError}
          onChangeHandler={(value) =>
            registerActions.handleInputValueChange("email", value)
          }
          onBlurHandler={(value) =>
            registerActions.handleInputValidationOnBlur("email", value)
          }
        />
        <AuthInput
          field="username"
          label="Username"
          type="text"
          value={state.username.value}
          validationMessage={usernameValidationMessage}
          showErrorMessage={state.username.showError}
          onChangeHandler={(value) =>
            registerActions.handleInputValueChange("username", value)
          }
          onBlurHandler={(value) =>
            registerActions.handleInputValidationOnBlur("username", value)
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
            registerActions.handleInputValueChange("password", value)
          }
          onBlurHandler={(value) =>
            registerActions.handleInputValidationOnBlur("password", value)
          }
        />
        <AuthInput
          field="passwordConf"
          label="Password confirmation"
          type="password"
          value={state.passwordConf.value}
          validationMessage={passwordConfValidationMessage}
          showErrorMessage={state.passwordConf.showError}
          onChangeHandler={(value) =>
            registerActions.handleInputValueChange("passwordConf", value)
          }
          onBlurHandler={(value) =>
            registerActions.handleInputValidationOnBlur("passwordConf", value)
          }
        />
        <button
          disabled={
            !state.password.isValid ||
            !state.email.isValid ||
            !state.username.isValid ||
            !state.passwordConf.isValid
          }
        >
          Register in
        </button>
      </form>

      <span className="auth-form-switch-label" onClick={switchAuthHandler}>
        Already have an account? Sign in
      </span>
    </div>
  );
};

export default Register;
