import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { db, connect } from "./db.js";
import UserRouter from "./Routes/user.js";
import TourRouter from "./Routes/tour.js";

await connect();

const app = express();
const corsOpt = {
    origin: "https://travel-app-frontend-2pmd.onrender.com/",
};

dotenv.config();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/users", UserRouter);
app.use("/tour", TourRouter);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Welcome to Backend of Tripito");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
