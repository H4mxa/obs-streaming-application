import React, { useCallback, useState } from "react";
import { registerStateTypes } from "../types";
import {
  passwordConfValidation,
  validateEmail,
  validatePassword,
  validateUsername,
} from "modules/validators";

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
  const [state, setState] = useState<registerStateTypes>(initialState);

  const handleInputValueChange = useCallback(
    (key: keyof registerStateTypes, value: string) => {
      setState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    },
    []
  );

  const handleInputValidationOnBlur = useCallback(
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
    },
    []
  );

  const registerActions = {
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    state,
    registerActions,
  };
};

export default useRegister;
