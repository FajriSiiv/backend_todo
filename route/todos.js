import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.js";
import { maxCapacity, verifyToken } from "../middlewares/middleware.js";

const router = express.Router();

router.get("/api/todos", verifyToken, getTodos);
router.get("/api/todos/:id", verifyToken, getTodo);
router.post("/api/todos", verifyToken, maxCapacity, addTodo);
router.patch("/api/todos/:id", verifyToken, updateTodo);
router.delete("/api/todos/:id", verifyToken, deleteTodo);

export default router;
