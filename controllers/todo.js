import jwt from "jsonwebtoken";
import Todo from "../model/todo.js";
import User from "../model/user.js";

// Get Todos
export const getTodos = async (req, res) => {
  const { token } = req.cookies;

  const decoded = jwt.verify(token, "jwtKey");

  try {
    const Todos = await Todo.find({ createBy: decoded.userId });

    res.status(200).send(Todos);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Get single todos
export const getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const Todos = await Todo.findById(todoId);

    res.status(200).send(Todos);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Add Todos
export const addTodo = async (req, res) => {
  const { token } = req.cookies;
  const decoded = jwt.verify(token, "jwtKey");

  try {
    const { title, description, completed, like } = req.body;

    const newTodo = new Todo({
      title,
      description,
      completed: completed || false,
      like: false,
      createBy: decoded.userId,
    });

    const savedTodo = await newTodo.save();

    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ msg: "Bad Request", error: error.message });
  }
};

// Update Todos
export const updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ msg: "Bad Request", error: error.message });
  }
};

// Delete Todos
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    res.status(200).json({ msg: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ msg: "Bad Request", error: error.message });
  }
};
