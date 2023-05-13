import express from "express";
import { singUp, signIn, googleSignIn } from "../Controllers/user.js";

const router = express.Router();

router.post("/signup", singUp);
router.post("/signin", signIn);
router.post("/googleSignIn", googleSignIn);

export default router;
