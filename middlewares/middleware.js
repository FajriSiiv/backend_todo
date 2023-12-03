import Todo from "../model/todo.js";
import jwt from "jsonwebtoken";

// Max Capacity todos
export const maxCapacity = async (req, res, next) => {
  try {
    const todoCount = await Todo.countDocuments();

    const maxTodos = 10;

    if (todoCount >= maxTodos) {
      return res
        .status(403)
        .json({ msg: "Maximum capacity reached. Cannot add more todos." });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

export const validationPassword = async (req, res, next) => {
  const { password, passValid } = req.body;

  try {
    if (password !== passValid)
      return res.status(400).send({ msg: "Password belum benar" });

    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

// Verify Token Login
export const verifyToken = (req, res, next) => {
  // Dapatkan token dari cookies
  const { token } = req.cookies;

  if (token == null) return res.sendStatus(401);
  jwt.verify(token, "jwtKey", (err, decoded) => {
    if (err) return res.status(403).send({ msg: err.message });
    next();
  });
};
