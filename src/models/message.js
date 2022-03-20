import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    text :{type:String, required:true},
    createAt : {type:Date, required:true, default:Date.now,},
    user : {type:mongoose.Schema.Types.ObjectId, ref:"User"},
    chatRoom : {type:mongoose.Schema.Types.ObjectId, ref:"Room"}
});

const Message = mongoose.model("Message",messageSchema);

export default Message;