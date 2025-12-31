import { Router } from "express";
import { createGroupConversation } from "../controllers/chat/makeGroup.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { sendMessage } from "../controllers/chat/sendMessage.js";

const router = Router();

router.post("/make-groups", authMiddleware, createGroupConversation);
router.post("/send-message", authMiddleware, sendMessage);

export default router;
