import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique:true},
    avatarUrl: {type:String,default:"/imgs/basic.png"},
    username: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    name:{type:String, required:true},
    friend:[{type:mongoose.Schema.Types.ObjectId, ref:"User"}]
});

userSchema.pre('save',async function(){
    if(this.isModified("password")){ 
        this.password = await bcrypt.hash(this.password,5);
    }
});

const User = mongoose.model('User', userSchema);
export default User;