"use strict";

var friendName = document.querySelector(".friend-name");
var friendPlus = document.querySelector(".friend-plus");

var handlePlus = function handlePlus(event) {
  event.preventDefault();
  var friendUserName = friendName.textContent;
  fetch("/api/search/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      friendUserName: friendUserName
    })
  });
  friendUserName.value = "";
  window.location.href = "/";
};

friendPlus.addEventListener("click", handlePlus);