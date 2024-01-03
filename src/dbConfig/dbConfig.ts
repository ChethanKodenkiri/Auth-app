import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection =  mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB database connection established successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB database connection error. Please make sure MongoDB is running."
      );
    });
  } catch (error) {
    console.log("Something went wrong");
    console.log(error);
  }
}
