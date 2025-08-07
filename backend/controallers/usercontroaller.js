import httpStatus from "http-status";
import {User} from "../models/usermodel.js";
import bcrypt,{hash} from "bcrypt";
import crypto from "crypto";
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User not found" });
    }

    const isPswdValid = await bcrypt.compare(password, user.password);

    if (isPswdValid) {
      const token = crypto.randomBytes(20).toString("hex");
      user.token = token;
      await user.save();

      return res.status(httpStatus.OK).json({ message: "Login successful", token });
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Login error:", error); // log for debugging
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
};


async function register(req, res) {
    const { name, username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(httpStatus.Found).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name: name, username: username, password: hashedPassword
        });
        await newUser.save();
        return res.status(201).json({ message: "User created" });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}
export {login,register};