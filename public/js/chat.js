window.onload = function () {
    var chatPage = document.getElementById('chat-page');
    var backBtn = document.getElementById('back-btn');
    var messages = document.getElementById('messages');
    var chatForm = document.getElementById('chat-msg');
    var msg = document.getElementById('m');
    var username = localStorage.getItem('username');
    var socket = io();

    chatForm.onsubmit = function (e) {
        e.preventDefault();
        socket.emit('chat message', username + ': ' + msg.value);
        msg.value = '';
        return false;
    };

    backBtn.onclick = function (e) {
        window.location.pathname = '/'
    }

    socket.on('chat message', function (msg) {
        messages.innerHTML += '<li>' + msg + '</li>';
    });

    socket.on('message', function (msg) {
        messages.innerHTML += '<li>' + msg + '</li>';
    });
};