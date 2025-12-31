import mongoose from "mongoose";
const ConversationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["DIRECT", "GROUP"],
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
