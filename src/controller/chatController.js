import Room from "../models/ChatRoom";
import User from "../models/User";

export const getChat = async(req,res) => {
    const {user_id,friend_id} = req.params;
    const foundRoom = await Room.exists({$and:[{user:user_id},{user:friend_id}]});
    if(foundRoom){
        return res.render('chat',{pageTitle:"ChattingRoom",foundRoom});
    }
    const room = await Room.create({
        user:user_id
    });
    room.user.push(friend_id);
    room.save();
    return res.status(200).render("chat",{pageTitle: "Chatting Room",room});
};
export const postChat = async(req,res)=>{
    const {user_id,friend_id} = req.params;
    const foundRoom = await Room.exists({$and:[{user:user_id},{user:friend_id}]});
    if(!foundRoom){
        return res.render('/',{pageTitle:"Friend"});
    }
    return res.status(200).render("chat",{pageTitle:"Chatting Room",foundRoom});
};
export const getChatRooms = async(req,res)=>{
    const {session:
        {user:_id}
    }= req;
    const rooms = await Room.find({user:_id}).populate("user").populate("message");
    console.log(rooms[1]);
    return res.render("rooms",{pageTitle:"Chatting Friends Room",rooms});
}