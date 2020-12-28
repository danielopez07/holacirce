window.onload = function () {
    var welcomePage = document.getElementById('welcome');
    var usernameForm = document.getElementById('username-form');
    var username = document.getElementById('name');
    var room = document.getElementById('room');
    var isUsernameTaken = localStorage.getItem('usernameTaken');
    var usernameTaken = localStorage.getItem('username');
    var userFeedback = document.getElementById('userFeedback');

    usernameForm.onsubmit = function (e) {
        e.preventDefault();
        localStorage.setItem('username', username.value);
        localStorage.setItem('room', room.value);
        localStorage.setItem('usernameTaken', false);
        userFeedback.style.display = 'none';
        window.location.pathname = '/chat';
    }

    if (isUsernameTaken) {
        userFeedback.innerHTML = 'Please choose another username, <em>' + usernameTaken + '</em> is already taken.';
        userFeedback.style.display = 'block';
    } else {
        userFeedback.style.display = 'none';
    }
};