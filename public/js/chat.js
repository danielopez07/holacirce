
window.onload = function () {
    var welcomePage = document.getElementById('welcome');
    var usernameForm = document.getElementById('username-form');
    var username = document.getElementById('name');
    var chatPage = document.getElementById('chat-page');
    var backBtn = document.getElementById('back-btn');
    var messages = document.getElementById('messages');
    var chatForm = document.getElementById('chat-msg');
    var msg = document.getElementById('m');
    var socket = io();

    usernameForm.onsubmit = function (e) {
        e.preventDefault();
        localStorage.setItem('username', username.value);
        welcomePage.classList.add('hidden');
        chatPage.classList.remove('hidden');
    }

    chatForm.onsubmit = function (e) {
        e.preventDefault();
        socket.emit('chat message', username.value + ': ' + msg.value);
        msg.value = '';
        return false;
    };

    backBtn.onclick = function (e) {
        chatPage.classList.add('hidden');
        welcomePage.classList.remove('hidden');
    }

    socket.on('chat message', function (msg) {
        messages.innerHTML += '<li>' + msg + '</li>';
    });

    socket.on('message', function (msg) {
        messages.innerHTML += '<li>' + msg + '</li>';
    });
};