import mongoose from "mongoose";
import clc from "cli-color";
import dotenv from "dotenv";

dotenv.config();

let db = null;

const connect = async () => {
    mongoose.set("strictQuery", false);
    db = await mongoose
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
};

export { db, connect };
