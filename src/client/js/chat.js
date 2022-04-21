const user_id = document.getElementById("user_id");
const room_id = document.getElementById("room_id");
const send_message = document.getElementById("send_message");
const message = document.getElementById("message");
const content = document.querySelector(".content");

var socket = io.connect();

console.log(user_id.value);
const roomID = room_id.value;
    socket.emit('joinRoom',{
        roomID
    });
socket.on('preload',function(msg){
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = msg.user.avatarUrl;
    img.id = "user_img";
    const span = document.createElement("span");
    span.id = "chatting_message";
    span.innerText = `${msg.user.name} : ${msg.text}\n`; 
    content.appendChild(img);
    content.appendChild(span);
});
socket.on('message',function(msg){
    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.src = msg.user.avatarUrl;
    img.id = "user_img";
    const span = document.createElement("span");
    span.id = "chatting_message";
    span.innerText = `${msg.user.name} : ${msg.text}\n`; 
    content.appendChild(img);
    content.appendChild(span);
});
const sending = ()=>{
    socket.emit('message',{
        userID: user_id.value,
        message: message.value,
        roomID : room_id.value
    });
    message.value ='';
}
const sendingKey = (key)=>{
    if(key.keyCode === 13){
        socket.emit('message',{
            userID: user_id.value,
            message: message.value,
            roomID : room_id.value
        });
        message.value='';
    }
}


send_message.addEventListener("click",sending);
message.addEventListener("keydown",sendingKey);