import React, { SyntheticEvent, useCallback, useState } from "react";
import { registerStateTypes } from "../types";
import {
  passwordConfValidation,
  validateEmail,
  validatePassword,
  validateUsername,
} from "modules/validators";
import { useEventCallback } from "modules/common/hooks";
import { useDispatch } from "react-redux";
import { registerActions as registerReduxActions } from "redux/register";

const initialState = {
  username: {
    value: "",
    isValid: false,
    showError: false,
  },
  email: {
    value: "",
    isValid: false,
    showError: false,
  },
  password: {
    value: "",
    isValid: false,
    showError: false,
  },
  passwordConf: {
    value: "",
    isValid: false,
    showError: false,
  },
};

const useRegister = () => {
  // hooks
  const [state, setState] = useState<registerStateTypes>(initialState);
  const dispatch = useDispatch();

  /*
     =================================================================
     --------------------- Register Methods start --------------------
     =================================================================
  */

  const handleInputValueChange = useEventCallback(
    (key: keyof registerStateTypes, value: string) => {
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    }
  );

  const handleInputValidationOnBlur = useEventCallback(
    (field: keyof registerStateTypes, value: string) => {
      let isValid = false;
      switch (field) {
        case "username":
          isValid = validateUsername(value);
          setState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
          break;
        case "email":
          isValid = validateEmail(value);
          setState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
          break;
        case "password":
          isValid = validatePassword(value);
          setState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
          break;
        case "passwordConf":
          isValid = passwordConfValidation(value, state.password.value);
          setState((prevState) => ({
            ...prevState,
            [field]: {
              ...prevState[field],
              isValid,
              showError: !isValid,
            },
          }));
          break;

        default:
          break;
      }
    }
  );

  const handleRegister = useEventCallback((event: SyntheticEvent) => {
    event.preventDefault();
    const payload = {
      email: state.email.value,
      password: state.password.value,
      username: state.username.value,
    };

    dispatch(registerReduxActions.processRegister(payload));
  });

  const registerActions = {
    handleRegister,
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    state,
    registerActions,
    isButtonDisabled:
      !state.password.isValid ||
      !state.email.isValid ||
      !state.username.isValid ||
      !state.passwordConf.isValid,
  };
};

export default useRegister;
