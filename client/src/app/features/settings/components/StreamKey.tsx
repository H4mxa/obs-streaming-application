interface StreamKeyProps {
  streamKey: string | null | undefined;
}

const StreamKey: React.FC<StreamKeyProps> = ({ streamKey }) => {
  return (
    <div className="settings-stream-key-container">
      <span>{streamKey ?? ""}</span>
    </div>
  );
};

export default StreamKey;
