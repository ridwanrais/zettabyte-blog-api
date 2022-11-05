import mongoose from "mongoose";
import dotenv from "dotenv";

// Use ES6 Promises for mongoose
mongoose.Promise = global.Promise;
// Set environment variables
let env = process.env.NODE_ENV;

if (env === "production") {
  dotenv.config();
  // Using mongoose to connect to MLAB database
  const uri = process.env.MONGODB_URI;
  mongoose.connect(uri);
} else {
  mongoose.connect("mongodb://localhost:27017/blog-db"),
    {
      useMongoClient: true,
    };
}

// Signal connection
mongoose.connection
  .once("open", function () {
    console.log("Connection has been made");
  })
  .on("error", function (error) {
    console.log("Connect error", error);
  })
  .on("disconnected", function () {
    console.log("Connection disconnected");
  });

export default mongoose;
