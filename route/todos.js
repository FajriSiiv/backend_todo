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
router.get("/api/todos/:id", getTodo);
router.post("/api/todos", maxCapacity, addTodo);
router.patch("/api/todos/:id", updateTodo);
router.delete("/api/todos/:id", deleteTodo);

export default router;
