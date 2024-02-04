import { SyntheticEvent, useEffect, useState } from "react";
import { channelSettings } from "../core/constants";
import { useEventCallback } from "modules/common/hooks";
import {
  validateAvatarUrl,
  validateDescription,
  validateTitle,
  validateUsername,
} from "modules/validators";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChannelLoading,
  selectChannelSettings,
} from "redux/channel/selector";
import { channelActions } from "redux/channel";

const initalState = {
  title: {
    isvalid: false,
    showError: false,
    value: "",
  },
  username: {
    isvalid: false,
    showError: false,
    value: "",
  },
  description: {
    isvalid: false,
    showError: false,
    value: "",
  },
  avatarUrl: {
    isvalid: false,
    showError: false,
    value: "",
  },
};

export type settingsFormStateTypes = typeof initalState;

const useChannelSettings = () => {
  const [formstate, setFormState] = useState(initalState);

  const dispatch = useDispatch();

  // selectors
  const getChannelSettings = useSelector(selectChannelSettings);
  const getChannelLoading = useSelector(selectChannelLoading);

  // effects
  useEffect(() => {
    if (!getChannelSettings) {
      dispatch(channelActions.processChannelSettings());
    }

    if (getChannelSettings) {
      setFormState((prevState) => ({
        ...prevState,
        title: {
          ...prevState["title"],
          isvalid: validateTitle(getChannelSettings.title),
          value: getChannelSettings.title,
        },
        description: {
          ...prevState["description"],
          isvalid: validateDescription(getChannelSettings.description),

          value: getChannelSettings.description,
        },
        username: {
          ...prevState["username"],
          isvalid: validateUsername(getChannelSettings.username),

          value: getChannelSettings.username,
        },
        avatarUrl: {
          ...prevState["avatarUrl"],
          isvalid: validateAvatarUrl(getChannelSettings.avatarUrl),
          value: getChannelSettings.avatarUrl,
        },
      }));
    }
  }, [getChannelSettings]);

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

  const handleFormSubmit = useEventCallback(() => {
    const payload = {
      title: formstate.title.value,
      description: formstate.description.value,
      username: formstate.username.value,
      avatarUrl: formstate.avatarUrl.value,
    };

    dispatch(channelActions.processUpdateChannelSettings(payload));
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
    getChannelLoading,
    getChannelSettings,
    isSubmitButtonDisabled:
      !formstate.title.isvalid ||
      !formstate.username.isvalid ||
      !formstate.avatarUrl.isvalid ||
      !formstate.description.isvalid,
  };
};

export default useChannelSettings;
