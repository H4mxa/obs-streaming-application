import LoadingSpinner from "modules/common/components/LoadingSpinner";
import ChannelSettings from "./components/ChannelSettings";
import PasswordSettings from "./components/PasswordSettings";
import StreamKey from "./components/StreamKey";
import { channelSettings } from "./core/constants";
import useChannelSettings from "./hooks/useChannelSettings";
import "./styles.css";

const Settings = () => {
  const {
    formstate,
    settingsActions,
    getChannelLoading,
    getChannelSettings,
    isSubmitButtonDisabled,
  } = useChannelSettings();

  if (getChannelLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="settings-container">
      <span>Settings</span>
      <ChannelSettings
        formstate={formstate}
        isSubmitButtonDisabled={isSubmitButtonDisabled}
        handleFormSubmit={() => settingsActions.handleFormSubmit()}
        handleInputValidationOnBlur={(field, value) =>
          settingsActions.handleInputValidationOnBlur(field, value)
        }
        handleInputValueChange={(field, value) =>
          settingsActions.handleInputValueChange(field, value)
        }
      />
      <PasswordSettings />
      <StreamKey streamKey={getChannelSettings?.streamKey} />
    </div>
  );
};

export default Settings;
