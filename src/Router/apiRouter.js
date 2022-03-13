import express from "express";
import { plusFriend, getSearch } from "../controller/userController";
const apiRouter = express.Router();

apiRouter.route("/search/add")
         .get(getSearch)
         .post(plusFriend);
         
export default apiRouter;