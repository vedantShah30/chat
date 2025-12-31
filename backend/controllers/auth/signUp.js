import User from "../../models/user.model.js";
import createSecretToken from "../../utils/generateSecret.js";

const isProd = process.env.PROD === "true";

const Signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({ email });
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "user already exists" });
    }
    const user = await User.create({
      email,
      password,
      username,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export { Signup };
