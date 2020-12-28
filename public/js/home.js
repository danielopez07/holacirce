window.onload = function () {
    var welcomePage = document.getElementById('welcome');
    var usernameForm = document.getElementById('username-form');
    var username = document.getElementById('name');
    var room = document.getElementById('room')

    usernameForm.onsubmit = function (e) {
        e.preventDefault();
        localStorage.setItem('username', username.value);
        localStorage.setItem('room', room.value);
        window.location.pathname = '/chat'
    }
};