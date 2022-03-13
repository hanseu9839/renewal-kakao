import express from "express";
import { handleFriend } from "../controller/userController";
import { postJoin,getJoin,getLogin,postLogin,getSearch,postSearch,logout } from "../controller/userController";
import { protectorMiddleware ,homeProtectorMiddleware } from "../middleware";
const globalRouter = express.Router();

globalRouter.route("/")
            .all(protectorMiddleware)
            .get(handleFriend);
            
globalRouter.route("/login")
            .all(homeProtectorMiddleware)
            .get(getLogin)
            .post(postLogin);
globalRouter.route("/join")
            .get(getJoin)
            .post(postJoin);

globalRouter.route("/search")
            .all(protectorMiddleware)
            .get(getSearch)
            .post(postSearch);
globalRouter.route("/logout")
            .get(logout);
export default globalRouter;