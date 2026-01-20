import User from "../models/User.js";
import bcrypt from "bcryptjs";

// REGISTER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;

    if (!name || !email || !password || age === undefined || age === null || age === "") {
      return res.status(400).json({ message: "All fields (name, email, password, age) are required" });
    }

    const numericAge = Number(age);
    if (Number.isNaN(numericAge) || numericAge < 0) {
      return res.status(400).json({ message: "Age must be a valid number" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      age: numericAge,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
