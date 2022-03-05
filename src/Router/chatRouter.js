import express from "express";
import { handleChat} from "../controller/chatRouter";
const chatRouter = express.Router();

chatRouter.get("/:id",handleChat);

export default chatRouter;