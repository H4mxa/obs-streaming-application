import { Server, Socket } from "socket.io";
import { getCorsOrigin } from "../utils/env";
import { emitChatHistory, emitChatMessage } from "./events/chatHistory.io";
import { IO_EVENTS } from "../utils/constants";
import { IMessageData } from "./types";

let io: any;

export const registerSocketServer = (app: any) => {
  const cors_origin = getCorsOrigin();

  io = new Server(app, {
    cors: {
      origin: [cors_origin],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("socket new connect: ", socket.id);

    socket.on(IO_EVENTS.CHAT_HISTORY, (channelId: string) => {
      emitChatHistory(socket, channelId);
    });
    socket.on(IO_EVENTS.CHAT_MESSAGE, (data: IMessageData) => {
      emitChatMessage(io, socket, data);
    });
  });
};
