import dotenv from "dotenv";

import { app, logger } from "./server";
import { getMongoURI } from "./utils/env";
import mongoose from "mongoose";
import { registerSocketServer } from "./IO";
import messageModel from "./models/message/message.model";

dotenv.config();

const port = process.env.PORT || 3000;

mongoose
  .connect(getMongoURI())
  .then(() => {
    const server = app.listen(port, () => {
      logger.info(`Server listening on port ${port}`);
    });

    registerSocketServer(server);

    messageModel.create();

    const onCloseSignal = () => {
      logger.info("sigint received, shutting down");
      server.close(() => {
        logger.info("server closed");
        process.exit();
      });
      setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
    };

    process.on("SIGINT", onCloseSignal);
    process.on("SIGTERM", onCloseSignal);
  })
  .catch((err) =>
    console.error("Database connection failed. Server not started", err)
  );
