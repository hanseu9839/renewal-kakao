import express from "express";
import { getChat} from "../controller/chatRouter";
const chatRouter = express.Router();

chatRouter.root("/:id([0-9a-f]{24})")
        .get(getChat)
        .post(postChat);

export default chatRouter;