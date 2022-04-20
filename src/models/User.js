import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique:true},
    avatarUrl: {type:String,default:"https://pbs.twimg.com/profile_images/1173873201039806464/R1lWiNES_400x400.jpg"},
    stateMessage : {type:String,default:"상태 메시지 설정 안함."},
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