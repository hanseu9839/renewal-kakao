import express from "express";
import morgan from "morgan";
import flash from "express-flash";
import session from "express-session";
import chatRouter from "./Router/chatRouter";
import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/userRouter";
import { localsMiddleware } from "./middleware";

const app = express();
const logger = morgan("dev");

app.set("view engine","pug");
app.set("views",process.cwd() + "/src/views")

app.use(logger);
app.use(express.urlencoded({extended: true}));

app.use(
    session({
      secret:"Hello!",
      resave:true,
      saveUninitialized:true,
  })
  );
app.use((req,res,next)=>{
   req.sessionStore.all((error, sessions)=>{
       console.log(sessions);
       next();
   });
});

app.use(flash());
app.use(localsMiddleware);
app.use("/imgs",express.static("imgs"));
app.use("/static",express.static("assets"));
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/chat",chatRouter);



export default app;