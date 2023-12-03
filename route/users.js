import express from "express";
import {
  addUser,
  getUsers,
  Login,
  logout,
  updateUser,
} from "../controllers/user.js";
import { validationPassword, verifyToken } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/api/user", verifyToken, getUsers);
router.post("/api/user", validationPassword, addUser);
router.patch("/api/user/:id", verifyToken, validationPassword, updateUser);
router.post("/api/login", Login);
router.delete("/api/logout", verifyToken, logout);

export default router;
