import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

const CONVERSATION_ID = "6954efe9253d63319c8c2a89";

socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);

  socket.emit("join_conversation", CONVERSATION_ID);
  console.log("📌 Joined conversation:", CONVERSATION_ID);
});

socket.on("new_message", (message) => {
  console.log("📨 New message received:", message);
});

socket.on("disconnect", () => {
  console.log("❌ Socket disconnected");
});
