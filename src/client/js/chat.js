$(() =>{ 
var socket = io();

socket.on('connect',function(){
    console.log('connection');
    console.log($('#room_id').val());
    const roomID = $('#room_id').val();
    socket.emit('join',{
        roomID
    });
    socket.emit('connection',{
        roomID
    });
});
socket.on('preload',function(msg){
    let output = '';
    output += '<div class="alert alert-info"><strong>';
    output += msg.user.name;
    output += '</strong> : ';
    output += msg.text;
    output += '</div>';
    console.log(output);
    $(output).prependTo('.content');
});
socket.on('message',function(data){
    let output='';
    output += 'dic class="alert alert-info"><strong>'
    output += data.message;
    output += '</strong>';
});
$('#send_message').click(function(){
       socket.emit('message',{
           userID : $('#user_id').val(),
           message:$('#message').val(),
           roomID : $('#room_id').val()
       });
       $('message').val('');
});
});