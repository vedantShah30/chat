import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket)=> {
    console.log("Socket connected: ", socket.id);
    socket.on("join_conversation", (conversationId) => {
        socket.join(conversationId);
        console.log(`Joined conversation ${conversationId}`);
    });
    socket.on("leave_conversation", (conversationId) => {
      socket.leave(conversationId);
    });
    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  })
};

export const getIO = () => {
    if(!io) throw new Error("Socket not initialized");
    return io;
}
