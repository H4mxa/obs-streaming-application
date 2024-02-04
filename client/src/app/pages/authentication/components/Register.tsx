import React from "react";
import Logo from "./Logo";
import Input from "../../../../modules/common/components/Input";
import useRegister from "../hooks/useRegister";
import {
  emailValidationMessage,
  passwordConfValidationMessage,
  passwordValidationMessage,
  usernameValidationMessage,
} from "modules/validators";
import { useRegisterSlice } from "redux/register";

interface IRegister {
  switchAuthHandler: () => void;
}

const Register: React.FC<IRegister> = ({ switchAuthHandler }) => {
  useRegisterSlice();
  const { state, registerActions, isButtonDisabled } = useRegister();

  return (
    <div className="register-container">
      <Logo text="Sign up to Twitch" />
      <form className="auth-form">
        <Input
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
        <Input
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
        <Input
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
        <Input
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
          disabled={isButtonDisabled}
          onClick={registerActions.handleRegister}
        >
          Register
        </button>
      </form>

      <span className="auth-form-switch-label" onClick={switchAuthHandler}>
        Already have an account? Sign in
      </span>
    </div>
  );
};

export default Register;
