window.onload = function(){
    var chatBox = $('.chat-box');
    var height = chatBox[0].scrollHeight;
    chatBox.scrollTop(height);
}
$(function(){
    var socket = io();
    socket.on('new message', function(msg){
        var chatBox = $('.chat-box');
        var messageBoxUser = '<div class="message-box-user">' + msg.username + ' #' + msg.playerTag +'</div>';
        var messageBoxContent = '<div class="message-box-content">'+ msg.message +'</div>';
        var timestamp = new Date(msg.timestamp);
        var date = timestamp.toLocaleDateString();
        var time = timestamp.toLocaleTimeString();
        //console.log(date + ' ' + time);
        var messageBoxDate = '<div class="message-box-date">' + date + ' ' + time + '</div>';
        chatBox.append('<div class="message-box">' + messageBoxUser + messageBoxContent + messageBoxDate + '</div>');
        var height = chatBox[0].scrollHeight;
        chatBox.scrollTop(height);
    });
});

function makeFullScreen(){
    $("#normies-chat").css({'overflow-x': 'hidden'});
    $('#message-input-form').css({'position':'fixed', 'bottom':'0.5em', 'width':'100%'});
    $('main').removeClass('container');
    $('header').css({'display':'none'});
    $('footer').css({'display': 'none'});
    $('#fullScreenButton').css({'display':'none'});
    $('#resetScreenButton').css({'display':'inline', 'text-align':'center'});
    $('#resetScreenButton').addClass('justify-content-center');
}
function resetChatScreen(){
    window.location="/chat";
}
$('#message-input-form').submit(function(e){
    e.preventDefault();
    var socket = io();
    var messageContent = $('#content').val();
    var msg = {};
    msg.content = messageContent;
    var messageJSON = JSON.stringify(msg);
    $.ajax({
        type: 'POST',
        data: messageJSON,
        contentType: 'application/json',
        url: '/api/chat/send'
    }).done(function(data){
        socket.emit('new message', data);
        $('#content').val('');
    }).fail(function(err){
        if(err.error != null && err.error != undefined){
            $('.modal-body').append(err.error);
            $('#exampleModal').modal('show');
        }else{
            $('.modal-body').append("Failed to send message");
            $('#errorModal').modal('show');
        }
    });
});