window.onload = function () {
    var welcomePage = document.getElementById('welcome');
    var usernameForm = document.getElementById('username-form');
    var username = document.getElementById('name');

    usernameForm.onsubmit = function (e) {
        e.preventDefault();
        localStorage.setItem('username', username.value);
        window.location.pathname = '/chat'
    }
};