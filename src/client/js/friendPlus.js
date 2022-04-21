const friendName = document.querySelectorAll(".friend-name");
const friendPlus = document.querySelectorAll(".friend-plus");

const handlePlus = (event,i)=>{
    event.preventDefault();
    const friendUserName=friendName[i].textContent;
    console.log(friendUserName);
    fetch("/api/search/add",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({friendUserName}),
    });
    friendUserName.value="";
    window.location.href="/";
}
for(let i=0;i<friendPlus.length;i++){
    friendPlus[i].addEventListener("click",handlePlus(i));
}