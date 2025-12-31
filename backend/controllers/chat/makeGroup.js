import Conversation from "../../models/conversation.model.js";
import User from "../../models/user.model.js";

const createGroupConversation = async (req, res) => {
  try {
    const { emails } = req.body;
    if (!emails || !Array.isArray(emails) || emails.length < 2) {
      return res.status(401).json({
        sucess: false,
        message: "atleast two emailId's are required to make a group",
      });
    }
    const users = await User.find({
      email: { $in: emails },
    }).select("_id email");

    if (users.length !== emails.length) {
      return res.status(404).json({
        success: false,
        message: "one or more users not found",
      });
    }

    const memberIds = users.map((user) => user._id);

    const conversation = await Conversation.create({
      type: "GROUP",
      members: memberIds,
    });
    return res.status(201).json({
      success: true,
      message: "group created successfully",
      conversation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export { createGroupConversation };
