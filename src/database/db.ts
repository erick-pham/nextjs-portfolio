import { waitFor } from "@/common/utils";
import type { ConnectOptions } from "mongoose";
import mongoose, { ConnectionStates } from "mongoose";

const connectionOptions: ConnectOptions = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
};

const connectToDatabase = async (): Promise<void> => {
  await waitFor(2000);
  if (mongoose.connection.readyState !== ConnectionStates.connected) {
    await mongoose.connect(process.env.MONGO_URI as string, connectionOptions);
  }
};

export default connectToDatabase;
