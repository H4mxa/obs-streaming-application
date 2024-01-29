import { SyntheticEvent, useState } from "react";
import { channelSettings } from "../core/constants";
import { useEventCallback } from "modules/common/hooks";
import {
  validateAvatarUrl,
  validateDescription,
  validateTitle,
  validateUsername,
} from "modules/validators";

interface defaultProps {
  settings: typeof channelSettings;
}

const useSettings = ({
  settings: { title, username, description, avatarUrl },
}: defaultProps) => {
  const [formstate, setFormState] = useState({
    title: {
      isvalid: false,
      showError: false,
      value: title,
    },
    username: {
      isvalid: false,
      showError: false,
      value: username,
    },
    description: {
      isvalid: false,
      showError: false,
      value: description,
    },
    avatarUrl: {
      isvalid: false,
      showError: false,
      value: avatarUrl,
    },
  });

  const [passwordFormState, setPasswordFormState] = useState({
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
     ------------------- settings Methods start ----------------------
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
      let isValid = false;
      switch (field) {
        case "title":
          isValid = validateTitle(value);
          break;
        case "username":
          isValid = validateUsername(value);
          break;
        case "avatarUrl":
          isValid = validateAvatarUrl(value);
          break;
        case "description":
          isValid = validateDescription(value);
          break;
      }

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
     --------------------- settings Methods End ----------------------
     =================================================================
  */

  const settingsActions = {
    handleFormSubmit,
    handleInputValueChange,
    handleInputValidationOnBlur,
  };

  return {
    formstate,
    settingsActions,
    passwordFormState,
    isSubmitButtonDisabled:
      !formstate.title.isvalid ||
      !formstate.username.isvalid ||
      !formstate.avatarUrl.isvalid ||
      !formstate.description.isvalid,
  };
};

export default useSettings;
