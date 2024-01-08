import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
  channel: { type: Schema.Types.ObjectId, ref: "Channel" },
  followedChannels: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Channel",
      },
    ],
  },
});

export type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
};

export default mongoose.model("User", userSchema);
