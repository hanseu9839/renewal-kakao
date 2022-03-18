import "dotenv/config";
import "./db";
import "./models/User";
import express from "express";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import flash from "express-flash";
import session from "express-session";
import chatRouter from "./Router/chatRouter";
import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/userRouter";
import apiRouter from "./Router/apiRouter";
import { localsMiddleware } from "./middleware";
import Socket  from "socket.io";
import http from "http";


const app = express();
const logger = morgan("dev");
const server = http.createServer(app);
const io = Socket(server);
const PORT = 4040;

const handleLitening= () =>
    console.log(`Server connect on port http://loacalhost:${PORT}`); 
app.set("view engine","pug");
app.set("views",process.cwd() + "/src/views")

app.use(logger);
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
  });
app.use(
  session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({mongoUrl:process.env.DB_URL}),
  })
);

app.use(flash());
app.use(localsMiddleware);
app.use("/imgs",express.static("imgs"));
app.use("/static",express.static("assets"));
app.use("/",globalRouter);
app.use("/users",userRouter);
app.use("/chat",chatRouter);
app.use("/api",apiRouter);


server.listen(PORT,handleLitening);

export default app;