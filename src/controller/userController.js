import bcrypt from "bcrypt";
import User from "../models/User";
export const handleHome = (req,res) => res.render("home",{siteName:"DoongTalk",
pageTitle:"Friend"});
export const getLogin = (req,res) => {
  return res.render("login",{pageTitle:"Login",siteName:"DoongTalk"});
}
export const postLogin = async(req,res) =>{
    const {username,password}= req.body;
    console.log(password);
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle:"Login",
            siteName:"DoongTalk",
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
    console.log(name);
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
        return res.redirect("/login");
}
export const handleEditUser = (req,res) => res.send("Edit User");