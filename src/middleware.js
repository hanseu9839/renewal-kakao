import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
export const localsMiddleware = (req,res,next) => {
   res.locals.loggedIn = Boolean(req.session.loggedIn);
   res.locals.siteName = "doongTalk";
   res.locals.loggedInUser = req.session.user || {};
   next();
}
const s3 = new aws.S3({
    credentials:{
        accessKeyId:process.env.AWS_ID,
        secretAccessKey:process.env.AWS_SECRET
    }
});
const isHeroku = process.env.NODE_ENV === "production";
const s3ImageUploader = multerS3({
    s3:s3,
    bucket : "doongtal/images",
    acl: "public-read",
});

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
    storage:isHeroku ? s3ImageUploader : undefined,
});