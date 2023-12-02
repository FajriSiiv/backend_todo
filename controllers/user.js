import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const user = await User.find();

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    res.send(200).json(user);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const addUser = async (req, res) => {
  const { username, password, name } = req.body;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
    });

    const saveUser = await newUser.save();

    res.status(201).json(saveUser);
  } catch (error) {
    res.status(400).json({ msg: "Bad Request", error: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { password, ...otherFields } = req.body;

  try {
    let hashedPassword;
    if (password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(password, saltRounds);
    }

    const updateFields = hashedPassword
      ? { ...otherFields, password: hashedPassword }
      : otherFields;

    const updateUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await User.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.send(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

// Login
export const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ msg: "Invalid user" });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Jika password tidak valid, kirim respons bahwa kredensial tidak valid
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid password" });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, "jwtKey", {
      expiresIn: "1h",
    });

    // Kirim respons dengan token
    res
      .status(200)
      .header("Authorization", `Bearer ${token}`)
      .json({ token, userId: user._id });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};

const revokedTokens = new Set();
// Logout
export const logout = (req, res) => {
  const { token } = req.body;

  // Tambahkan token ke daftar logout
  revokedTokens.add(token);

  res.status(200).json({ msg: "Logout successful" });
};
