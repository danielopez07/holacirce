
window.onload = function () {
    var chat_page = document.getElementById('chat-page');
    chat_page.classList.add('hidden');

    var socket = io();
    $('form #chat-msg').submit(function (e) {
        e.preventDefault();
        socket.emit('chat message', $('#m').val());
        $('#m').val('');
        return false;
    });

    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });

    socket.on('message', function (msg) {
        $('#messages').append($('<li>').text(msg));
    });
};