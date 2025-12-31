import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
    required: true,
    index: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: {
      type: String,
      enum: ["TEXT", "IMAGE", "FILE"],
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
    mediaUrl: {
      type: String,
      default: "",
    },
  },
  sequenceNumber: {
    type: Number,
    required: true,
  },
});

export default new mongoose.model("Message", MessageSchema);