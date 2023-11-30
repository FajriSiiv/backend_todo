import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import routerTodos from "./route/todos.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGOOSE_USER);

const db = mongoose.connection;

app.use(express.json());
app.use(routerTodos);

db.on("error", (error) => console.log(error));
db.once("open", () => {
  console.log("Database Connected...");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
