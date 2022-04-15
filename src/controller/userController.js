import bcrypt from "bcrypt";
import session from "express-session";
import User from "../models/User";
export const handleHome = async(req,res) => {
    const {session:
        {user:_id}
    } = req;
    const user = await User.findOne({_id}).populate("friend");
    const friends = user.friend;
    return res.render("home",{siteName:"DoongTalk",
                pageTitle:"Friend",friends});
}
export const getLogin = (req,res) => {
  return res.render("login",{pageTitle:"Login",siteName:"DoongTalk"});
};
export const postLogin = async(req,res) =>{
    const {username,password}= req.body;
    const user = await User.findOne({username});
    if(!user){
        return res.status(400).render("login",{
            pageTitle:"Login",
            errorMessage:"이 사용자 이름을 가진 계정이 없습니다.",
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle:"Login",
            siteName:"DoongTalk",
            ErrorMessage:"잘못된 패스워드입니다.",
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
                errorMessage: "비밀번호 확인이 일치하지 않습니다",     
            });
        }
        const exists = await User.exists({$or:[{username},{email}]});
        if(exists){
            return res.status(400).render("join",{pageTitle,
            errorMessage:"이 사용자 이름/이메일은 이미 사용되고 있습니다.",
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
export const getEdit = (req,res) => {
    res.render("edit",{
        pageTitle:"profile-edit",
    });
}
export const postEdit = async(req,res) =>{
    const {
        session: {
            user:{ _id, avatarUrl, email:sessionEmail, name:sessionName,},
        },
        body:{name,email,stateMessage},
        file
    } = req;
   
    if(sessionEmail!==email){
        const foundUser = await User.findOne({email});
        if(foundUser&&foundUser._id !== _id){
            return res.status(400).render("edit",{
                pageTitle: "Profile-edit",
                errorMessage: "이미 있는 이메일입니다."
            });
        }
    }
    const updatedUser = await User.findByIdAndUpdate(_id,{
        name:name, email:email, stateMessage:stateMessage,
        avatarUrl: file ? file.path : avatarUrl,
    },{new: true});
    req.session.user = updatedUser;
    console.log(updatedUser);
    return res.redirect("/users/edit");
}

export const getSearch = (req,res) => {
    return res.render("search",{
        pageTitle:"Search"
    });
};
export const postSearch = async(req,res) =>{
    const {user}= req.session;
    const {useremail} = req.body;
    const foundUser = await User.findOne({email:useremail});
    console.log(user._id);
    console.log(foundUser._id);
    if(user._id==foundUser._id){
        return res.render("search",{errorMessage:"본인은 친구가 될 수 없습니다."})
    }
    if(!foundUser){
        return res.render("search",{errorMessage:"이메일을 찾을수 없습니다."});
    }
    return res.render("search",{foundUser});
};
export const plusFriend = async(req,res) =>{
    const {body:friendUserName,
        session:{user},
    } = req;
    console.log(friendUserName);
    let flag;
    const friendUser = await User.findOne({username:friendUserName.friendUserName});
    const friend=friendUser._id;
    const currentUser = await User.findById(user._id);
    console.log(friendUser);
    for(let num=0;num<currentUser.friend.length;num++){
        flag = currentUser.friend[num]._id.toString()===friendUser._id.toString();
        if(flag){
            return res.sendStatus(404);
        }
    } 
    currentUser.friend.push(friend);
    currentUser.save();
    req.session.user = currentUser;
    return res.sendStatus(201); 
};

export const logout = (req,res) => {
    req.session.destroy();
    return res.redirect("/login");
};

export const getChangePassword = (req,res)=>{
    return res.render("users/change-password",{pageTitle:"Change Password"});
};
export const postChangePassword = async(req,res) =>{
    const {
        body:{  oldPassword,newPassword,newPasswordConfirmation},
        session: {
            user:{_id},
        }
    } = req;

    const user = await User.findById(_id);
    const ok = await bcrypt.compare(oldPassword,user.password);
    
    if(oldPassword === newPassword){
        return res.status(400).render("users/change-password",{
            pageTitle:"change-password",
            errorMessage:"바꾸려는 비밀번호가 현재 비밀번호와 같습니다."        
        });
    }
    if(!ok){
        return res.status(400).render("users/change-password",{
            pageTitle:"change-password",
            errorMessage:"현재 비밀번호가 틀렸습니다."        
        });
    }
    if(newPassword!==newPasswordConfirmation){
        return res.status(400).render("users/change-password",{
            pageTitle:"Change password",
            errorMessage:"패스워드 두개가 일치하지 않습니다."
        })
    }
    user.password=newPassword;
    await user.save();
    return res.redirect("/");
};