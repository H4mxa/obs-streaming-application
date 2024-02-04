import { ReactFlvPlayer } from "react-flv-player";

const Stream = ({ streamUrl }: { streamUrl: string }) => {
  return (
    <div className="channel-video-container">
      <ReactFlvPlayer width="100%" height="100%" url={streamUrl} />
    </div>
  );
};

export default Stream;
