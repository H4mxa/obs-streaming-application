import React, { useCallback, useState } from "react";
import { loginStateTypes } from "../types";
import { validateEmail, validatePassword } from "modules/validators";

const useLogin = () => {
  const [state, setState] = useState<loginStateTypes>({
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
  });

  const handleInputValueChange = useCallback(
    (key: keyof loginStateTypes, value: string) => {
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
    (field: keyof loginStateTypes, value: string) => {
      let isValid = false;
      debugger;
      switch (field) {
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

        default:
          break;
      }
    },
    []
  );

  const loginActions = {
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    state,
    loginActions,
  };
};

export default useLogin;
