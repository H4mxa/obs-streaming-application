import mongoose from "mongoose";
import { v4 as uuid } from "uuid";
import {
  DEFAULT_CHANNEL_DESCRIPTION,
  DEFAULT_CHANNEL_TITLE,
} from "../../utils/constants";

const { Schema } = mongoose;

const channelSchema = new Schema({
  isActive: { type: Boolean, default: false },
  title: { type: String, default: DEFAULT_CHANNEL_TITLE },
  description: { type: String, default: DEFAULT_CHANNEL_DESCRIPTION },
  avatarUrl: { type: String, default: "none" },
  streamKey: { type: String, default: uuid() },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: "Message " }],
    default: [],
  },
});

export default mongoose.model("Channel", channelSchema);
