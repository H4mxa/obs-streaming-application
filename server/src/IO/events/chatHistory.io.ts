import { Socket } from "socket.io";
import { IO_EVENTS } from "../../utils/constants";
import channelModel from "../../models/channel/channel.model";
import messageModel from "../../models/message/message.model";
import { IMessageData } from "../types";

export async function emitChatHistory(socket: Socket, channelId: string) {
  try {
    const channel = await channelModel.findById(channelId).populate("messages");

    if (channel) {
      socket.emit(IO_EVENTS.CHAT_HISTORY, {
        succes: true,
        channelId,
        messages: channel.messages.map((message: any) => ({
          author: message.author,
          content: message.content,
        })),
      });
    }
  } catch (e) {
    console.error(e);
    socket.emit(IO_EVENTS.CHAT_HISTORY, {
      success: false,
    });
  }
}

export async function emitChatMessage(
  io: any,
  socket: Socket,
  messageData: IMessageData
) {
  try {
    const channel = await channelModel.findById(messageData.toChanneL);

    if (channel) {
      const newMessage = new messageModel({
        content: messageData.message.content,
        author: messageData.message.author,
        date: new Date(),
      });
      await newMessage.save();

      channel.messages.push(newMessage._id);

      await channel.save();

      console.log("emitting meesage back to client", {
        author: messageData.message.author,
        content: messageData.message.content,
      });

      io.sockets.emit(IO_EVENTS.CHAT_MESSAGE, {
        succes: true,
        channelId: messageData.toChanneL,
        message: {
          author: messageData.message.author,
          content: messageData.message.content,
        },
      });
    }
  } catch (e) {
    console.error(e);
    socket.emit(IO_EVENTS.CHAT_MESSAGE, {
      success: false,
    });
  }
}
