
window.onload = function () {
    var welcomePage = document.getElementById('welcome');
    var chatPage = document.getElementById('chat-page');
    var messages = document.getElementById('messages');
    var chatForm = document.getElementById('chat-msg');
    var msg = document.getElementById('m');
    var socket = io();
    
    // welcomePage.classList.add('hidden');
    // chatPage.classList.add('hidden');

    chatForm.onsubmit = function (e) {
        e.preventDefault();
        socket.emit('chat message', msg.value);
        msg.value = '';
        return false;
    };

    socket.on('chat message', function (msg) {
        messages.innerHTML += '<li>' + msg + '</li>';
    });

    socket.on('message', function (msg) {
        messages.innerHTML += '<li>' + msg + '</li>';
    });
};