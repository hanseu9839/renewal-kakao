import multer from "multer";
export const localsMiddleware = (req,res,next) => {
   res.locals.loggedIn = Boolean(req.session.loggedIn);
   res.locals.siteName = "doongTalk";
   res.locals.loggedInUser = req.session.user || {};
   next();
}
export const protectorMiddleware = (req,res,next) =>{
    if(req.session.loggedIn){
        return next();
    }else{
        req.flash("error","Log in first");
        return res.redirect("/login");
    }
}
export const homeProtectorMiddleware = (req,res,next)=>{
    console.log(req.session);
    if(req.session.loggedIn){
        return res.redirect("/");
    }else{
        return next();
    }
}

export const avatarUpload = multer({
    dest:"imgs/",
limits:{
    fileSize:3000000,
},
});