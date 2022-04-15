"use strict";

var user_id = document.getElementById("user_id");
var room_id = document.getElementById("room_id");
var send_message = document.getElementById("send_message");
var message = document.getElementById("message");
var content = document.querySelector(".content");
var socket = io.connect();
console.log(user_id.value);
var roomID = room_id.value;
socket.emit('joinRoom', {
  roomID: roomID
});
socket.on('preload', function (msg) {
  var img = document.createElement("img");
  img.src = "/" + msg.user.avatarUrl;
  img.id = "user_img";
  var span = document.createElement("span");
  span.id = "chatting_message";
  span.innerText = "".concat(msg.user.name, " : ").concat(msg.text, "\n");
  content.appendChild(img);
  content.appendChild(span);
});
socket.on('message', function (msg) {
  var img = document.createElement("img");
  img.src = "/" + msg.user.avatarUrl;
  img.id = "user_img";
  var span = document.createElement("span");
  span.id = "chatting_message";
  span.innerText = "".concat(msg.user.name, " : ").concat(msg.text, "\n");
  content.appendChild(img);
  content.appendChild(span);
});

var sending = function sending() {
  socket.emit('message', {
    userID: user_id.value,
    message: message.value,
    roomID: room_id.value
  });
  message.value = '';
};

var sendingKey = function sendingKey(key) {
  if (key.keyCode === 13) {
    socket.emit('message', {
      userID: user_id.value,
      message: message.value,
      roomID: room_id.value
    });
    message.value = '';
  }
};

send_message.addEventListener("click", sending);
message.addEventListener("keydown", sendingKey);