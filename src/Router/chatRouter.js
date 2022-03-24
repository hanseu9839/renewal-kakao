import express from "express";
import { getChat,postChat,getChatRooms} from "../controller/chatController";
const chatRouter = express.Router();

chatRouter.route("/:user_id([0-9a-f]{24})/:friend_id([0-9a-f]{24})")
        .get(getChat)
        .post(postChat);
chatRouter.route("/rooms")
          .get(getChatRooms);
export default chatRouter;