import express from "express";
import { getChangePassword, getEdit,postEdit,postChangePassword} from "../controller/userController";
import {avatarUpload, protectorMiddleware} from "../middleware";
const userRouter = express.Router();

userRouter.route("/edit")
          .all(protectorMiddleware)
          .get(getEdit)
          .post(avatarUpload.single("avatar"),postEdit);
userRouter.route("/change-password")
          .all(protectorMiddleware)
          .get(getChangePassword)
          .post(postChangePassword);
            
export default userRouter;