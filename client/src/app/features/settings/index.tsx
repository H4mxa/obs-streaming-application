import ChannelSettings from "./components/ChannelSettings";
import PasswordSettings from "./components/PasswordSettings";
import StreamKey from "./components/StreamKey";
import { channelSettings } from "./core/constants";
import "./styles.css";

const Settings = () => {
  return (
    <div className="settings-container">
      <span>Settings</span>
      <ChannelSettings settings={channelSettings} />
      <PasswordSettings />
      <StreamKey streamKey={channelSettings.streamKey} />
    </div>
  );
};

export default Settings;
