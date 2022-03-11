import express from "express";
import { plusFriend } from "../controller/userController";
const apiRouter = express.Router();

apiRouter.post("/search/add",plusFriend);
export default apiRouter;