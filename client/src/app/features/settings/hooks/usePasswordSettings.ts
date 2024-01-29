import { SyntheticEvent, useState } from "react";
import { channelSettings } from "../core/constants";
import { useEventCallback } from "modules/common/hooks";
import {
  validateAvatarUrl,
  validateDescription,
  validatePassword,
  validateTitle,
  validateUsername,
} from "modules/validators";

const usePasswordSettings = () => {
  const [formstate, setFormState] = useState({
    password: {
      isvalid: false,
      showError: false,
      value: "",
    },
    newPassword: {
      isvalid: false,
      showError: false,
      value: "",
    },
  });

  /*
     =================================================================
     --------------- Password Settings Methods start -----------------
     =================================================================
  */

  const handleInputValueChange = useEventCallback(
    (key: keyof typeof formstate, value: string) => {
      setFormState((prevState) => ({
        ...prevState,
        [key]: {
          ...prevState[key],
          value,
        },
      }));
    }
  );

  const handleInputValidationOnBlur = useEventCallback(
    (field: keyof typeof formstate, value: string) => {
      let isValid = validatePassword(value);

      setFormState((prevState) => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          isvalid: isValid,
          showError: !isValid,
        },
      }));
    }
  );

  const handleFormSubmit = useEventCallback((event: SyntheticEvent) => {
    event.preventDefault();
  });

  /*
     =================================================================
     ---------------- Password Settings Methods End ------------------
     =================================================================
  */

  const passwordSettingsActions = {
    handleFormSubmit,
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    formstate,
    passwordSettingsActions,
    isSubmitButtonDisabled:
      !formstate.password.isvalid || !formstate.newPassword.isvalid,
  };
};

export default usePasswordSettings;
