import express from "express";
import { addUser, getUsers, Login, updateUser } from "../controllers/user.js";
import { validationPassword, verifyToken } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/api/user", verifyToken, getUsers);
router.post("/api/user", validationPassword, addUser);
router.patch("/api/user/:id", validationPassword, updateUser);
router.post("/api/login", Login);

export default router;
