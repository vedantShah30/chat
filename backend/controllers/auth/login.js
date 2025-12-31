import User from "../../models/user.model.js";
import bcrypt from "bcrypt";
import createSecretToken from "../../utils/generateSecret.js";

const isProd = process.env.PROD === "true";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "user not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({
          success: false,
          message: "either password or email does not match",
        });
    }

    const token = createSecretToken(existingUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
        success: true,
        message: "login successful",
        user: {
            id: existingUser._id,
            username: existingUser.username,
            email: existingUser.email,
            avatarUrl: existingUser.avatarUrl,
        },
        token: token
    })

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { Login };
