import express from "express";
import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo.js";
import { maxCapacity } from "../middlewares/todo.js";

const router = express.Router();

router.get("/api/todos", getTodos);
router.get("/api/todos/:id", getTodo);
router.post("/api/todos", maxCapacity, addTodo);
router.patch("/api/todos/:id", updateTodo);
router.delete("/api/todos/:id", deleteTodo);

export default router;
