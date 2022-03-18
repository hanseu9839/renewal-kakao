import mongoose from "mongoose";

const roomSchema = new.Schema({
    user : [{type:mongoose.Schema.Types.ObjectId, ref:"User"}],
});