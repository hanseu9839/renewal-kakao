import bcrypt from "bcrypt";
import session from "express-session";
import User from "../models/User";
export const handleHome = (req,res) => res.render("home",{siteName:"DoongTalk",
pageTitle:"Friend"});
export const getLogin = (req,res) => {
  return res.render("login",{pageTitle:"Login",siteName:"DoongTalk"});
};
export const postLogin = async(req,res) =>{
    const {username,password}= req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle:"Login",
            errorMessage:"An account with this username does not exists.",
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle:"Login",
            siteName:"DoongTalk",
            ErrorMessage:"Wrong password",
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
}
export const getJoin = (req,res) => {
    return res.render("join",{pageTitle:"Join",siteName:"DoongTalk"});
}
export const postJoin = async(req,res) =>{
    const {name,username,email,password,password2} = req.body;
    const pageTitle = "Join";
        if(password !== password2){
            return res.status(400).render("join",{
                pageTitle,
                errorMessage: "Password confirmation does not match.",     
            });
        }
        const exists = await User.exists({$or:[{username},{email}]});
        if(exists){
            return res.status(400).render("join",{pageTitle,
            errorMessage:"This username/email is already taken.",
        });
        }
        try{
            await User.create({
                name,
                username,
                email,
                password,
            });
        }catch(error){
            return res.status(400).render("join",{
                pageTitle:"Join",
                errorMessage: error._message,
            });
        }
        return res.redirect("/");
}
export const handleEditUser = (req,res) => res.send("Edit User");


export const getSearch = (req,res) => {
    return res.render("search",{
        pageTitle:"Search"
    });
};
export const postSearch = async(req,res) =>{
    const {useremail} = req.body;
    const foundUser = await User.findOne({email:useremail});
    if(!foundUser){
        return res.render("search",{errorMessage:"Email could not be found"});
    }
    return res.render("search",{foundUser});
};
export const plusFriend = async(req,res) =>{
    const {body:friendUserName,
        session:{user},
    } = req;
    let flag;
    const friendUser = await User.findOne({username:friendUserName.friendUserName});
    const friend=friendUser._id;
    const currentUser = await User.findById(user._id);
    for(let num=0;num<currentUser.friend.length;num++){
        flag = currentUser.friend[num]._id.toString()===friendUser._id.toString();
        if(flag){
            return res.sendStatus(404);
        }
    } 
    currentUser.friend.push(friend);
    currentUser.save();
    return res.sendStatus(201); 
};

export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/login");
};