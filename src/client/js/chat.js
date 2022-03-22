$(function(){ 
var socket = io.connect();
const roomID = $('#room_id').val();
    socket.emit('joinRoom',{
        roomID
    });
socket.on('connect',function(){
    console.log('connection');
    console.log($('#room_id').val());
    
});
socket.on('preload',function(msg){
    let output = '';
    output += '<div class="alert alert-info"><strong>';
    output += msg.user.name;
    output += '</strong> : ';
    output += msg.text;
    output += '</div>';
    $(output).prependTo('.content');
});
socket.on('message',function(msg){
    let output ='';
    output += '<div class="alert alert-info"><strong>';
    output += msg.user.name;
    output += '</strong> : ';
    output += msg.text;
    output += '</div>';
    console.log(output);
    $(output).prependTo('.content');
});
$('#send_message').click(function(){
       socket.emit('message',{
           userID : $('#user_id').val(),
           message:$('#message').val(),
           roomID : $('#room_id').val()
       });
       $('#message').val('');
});
$('#message').keydown(function(key){
    if(key.keyCode === 13){
        console.log("enter");
        socket.emit('message',{
            userID : $('#user_id').val(),
            message:$('#message').val(),
            roomID : $('#room_id').val()
        });
        $('#message').val('');
    }
});
});