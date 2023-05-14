import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../Models/user.js";
import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
dotenv.config();

const client = new OAuth2Client(process.env.CLIENT_ID);

const secret = "test";

export const singUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`,
        });

        const token = jwt.sign(
            { email: result.email, id: result._id },
            secret,
            { expiresIn: "24h" }
        );
        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, Try again later",
            error: error,
        });
        console.log(error);
    }
};

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email });
        if (!oldUser)
            return res.status(400).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            oldUser.password
        );

        if (!isPasswordCorrect)
            return res.status(404).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            { expiresIn: "24h" }
        );

        res.status(200).json({ result: oldUser, token });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong, Try again later",
            error: error,
        });
        console.log(error);
    }
};

export const googleSignIn = async (req, res) => {
    const { jwtToken } = req.body;
    let payload;
    try {
        const ticket = await client.verifyIdToken({
            idToken: jwtToken,
            audience: process.env.CLIENT_ID,
        });
        payload = ticket.getPayload();
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: "Invalid Token" });
    }
    if (payload) {
        const email = payload.email;
        const name = payload.name;
        const googleId = payload.sub;
        try {
            const hashedGoogleId = await bcrypt.hash(googleId, 12);
            const olduser = await UserModel.findOne({ email });
            if (olduser) {
                const result = { _id: olduser._id.toString(), email, name };

                const token = jwt.sign(
                    { email: result.email, id: result._id },
                    secret,
                    { expiresIn: "24h" }
                );
                return res.status(200).json({ result: result, token: token });
            }
            const result = await UserModel.create({
                email,
                name,
                googleId: hashedGoogleId,
            });
            const token = jwt.sign(
                { email: result.email, id: result._id },
                secret,
                { expiresIn: "24h" }
            );
            res.status(200).json({ result: result, token: token });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong, Try again later",
                error: error.message,
            });
            console.log(error);
        }
    }
};
