import express from "express";
import { handleHome } from "../controller/userController";
import { postJoin,getJoin,getLogin,postLogin } from "../controller/userController";
import { protectorMiddleware } from "../middleware";
const globalRouter = express.Router();

globalRouter.route("/")
            .all(protectorMiddleware)
            .get(handleHome);
globalRouter.route("/join")
            .get(getJoin)
            .post(postJoin);
globalRouter.route("/login")
            .get(getLogin)
            .post(postLogin);
export default globalRouter;