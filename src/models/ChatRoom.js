import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    user : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
    message : [{type:mongoose.Schema.Types.ObjectId, ref:"Message"}]
});


const Room = mongoose.model("Room",roomSchema);

export default Room;