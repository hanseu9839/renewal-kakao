import express from "express";
import { getEdit,postEdit} from "../controller/userController";
import {protectorMiddleware} from "../middleware";
const userRouter = express.Router();

userRouter.route("/edit")
          .all(protectorMiddleware)
          .get(getEdit)
          .post(postEdit);


            
export default userRouter;