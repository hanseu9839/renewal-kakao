
const express = require("express");
const PORT = 4040;
const handleLitening= () =>console.log(`Server connect on port http://loacalhost:${PORT}`);

const app = express();
const handleHome = (req,res) =>{
    return res.send("kakao home renewal");
}
const handleLogin = (req,res) =>{
    return res.send("Login Screen");
}
app.get("/",handleHome);
app.get("/login",handleLogin);
app.listen(PORT,handleLitening);
