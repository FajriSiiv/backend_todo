import Todo from "../model/todo.js";

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
