import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL,{

});

const handleOpen= ()=>console.log("Connected to DB😎");
const handleError = ()=> console.log("DB Error",error);
const db = mongoose.connection;
db.on("error",handleError);
db.once("open",handleOpen);