import mongoose from "mongoose";
import Logger from "../helpers/logger";


class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
  };

  constructor() {
    setTimeout(this.connectWithRetry,  1000);
    this.connectWithRetry();
  }

  getInstance() {
    return mongoose;
  }

  connectWithRetry() {
    Logger.debug(`process.env.DB_URL : ${process.env.DB_URL}`, );
    const MONGODB_URI = process.env.DB_URL || "";
    Logger.debug("Connecting to MongoDB(Retry when failed)");
    mongoose
      .connect(MONGODB_URI, this.mongooseOptions)
      .then(() => {
        Logger.debug("MongoDB is connected");
      })
      .catch((err) => {
        const retrySeconds = 5;
        Logger.error(
          `MongoDB connection unsuccessful (will retry #${++this
            .count} after ${retrySeconds} seconds):`,
          err
        );
        setTimeout(this.connectWithRetry, retrySeconds * 1000);
      });
  }
}

export default new MongooseService();
