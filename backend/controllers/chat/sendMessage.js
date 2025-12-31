import Conversation from "../../models/conversation.model.js";
import Message from "../../models/message.model.js";
import { getIO } from "../../socket/index.js";

const sendMessage = async (req, res) => {
  try {
    const { conversationId, senderId, content } = req.body;
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res
        .status(404)
        .json({ success: false, message: "conversation not found" });
    }
    // console.log("conversation: ", conversation);
    if (!conversation.members.some((id) => id.toString() === senderId)) {
      return res.status(403).json({
        success: false,
        message: "sender is not the part of this thread",
      });
    }
    const lastMessage = await Message.findOne({ conversationId }).sort({
      sequenceNumber: -1,
    });
    console.log("lastMessage: ", lastMessage);
    const sequenceNumber = lastMessage ? lastMessage.sequenceNumber + 1 : 1;
    const message = await Message.create({
      conversationId,
      senderId,
      content,
      sequenceNumber,
    });
    console.log("message: ", message);
    const io = getIO();
    io.to(conversationId.toString()).emit("new_message", {
      _id: message._id,
      conversationId,
      senderId,
      content,
      sequenceNumber,
    });
    res.status(201).json({ success: true, message });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "internal server error" });
  }
};

export { sendMessage };
