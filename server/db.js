import mongoose from "mongoose";
import clc from "cli-color";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", false);
export const db = mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log(clc.blue("Connected to MongoDb successfully"));
    })
    .catch((err) => {
        console.log(clc.red("Failed to connect", err));
    });
// Test 2
