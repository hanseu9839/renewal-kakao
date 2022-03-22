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
import Room from "./models/ChatRoom";
import Socket  from "socket.io";
import http from "http";
import Message from "./models/message";



const app = express();
const logger = morgan("dev");
const server = http.createServer(app);
const io = Socket(server);
const PORT = 4040;

io.sockets.on('connection',function(socket){
  //socket에서 connection을 하면 DB의 room을 찾아준다. 그 후 room에서 stateMessage들을 다 집어넣어줌 
  //populate를 써야 하는 거같음 왜냐하면 room에서는 message들의 값을 가져와야하기 떄문임
  console.log('connect');
    socket.on('disconnect',()=>{
      console.log('user disconnected');
    });
    socket.on('joinRoom',async function(data){
      socket.join(data.roomID);
      socket.room = data.roomID;
      console.log(data.roomID);
      const findRoom = await Room.findById(data.roomID).populate("message");
        for(let i=findRoom.message.length-1;i>=0;i--){
          const msg  = await Message.findById(findRoom.message[i]._id).populate("user");
          io.to(socket.id).emit('preload',msg);
        }
    });
    socket.on('error',(error)=>{
      console.log(`에러 발생: ${error}`)
    })
    socket.on('message',async function(data){
        const message = await Message.create({
          text:data.message,
          user:data.userID,
          chatRoom:data.roomID,
        });
        console.log("dbConnection");
        const msg = await Message.findById(message._id).populate("user");
        console.log(msg);
        const room = await Room.findById(data.roomID);
        room.message.push(message._id);
        room.save();
        io.to(socket.room).emit('message',msg);
    });
  });

const handleLitening= () =>
    console.log(`Server connect on port http://loacalhost:${PORT}`); 
app.set("view engine","pug");
app.set("views",process.cwd() + "/src/views")

app.use(logger);
app.use(express.urlencoded({extended: true}));

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
app.use(express.json());
app.use((req, res, next) => {
    res.header("Cross-Origin-Embedder-Policy", "require-corp");
    res.header("Cross-Origin-Opener-Policy", "same-origin");
    next();
  });

server.listen(PORT,handleLitening);

export default app;