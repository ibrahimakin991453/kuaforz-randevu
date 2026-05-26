import app from "./app.js";
import { env } from "./config/env.js";
import logger from "./utils/logger.js";

const port = parseInt(env.PORT, 10);

const server = app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Graceful shutdown...");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Graceful shutdown...");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});
