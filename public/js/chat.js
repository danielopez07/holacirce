window.onload = function () {
    var chatPage = document.getElementById('chat-page');
    var backBtn = document.getElementById('back-btn');
    var messages = document.getElementById('messages');
    var chatForm = document.getElementById('chat-msg');
    var msg = document.getElementById('m');
    var scrollDownBtn = document.getElementById('scroll-down');
    var username = localStorage.getItem('username');
    var room = localStorage.getItem('room');
    var socket = io('/', {query: {username: username, room: room}});

    function addNewLine(message) {
        if (!message) return;
    
        messages.innerHTML += '<li>' + message + '</li>';
        updateScroll();
    }

    chatForm.onsubmit = function (e) {
        e.preventDefault();
        if (!msg.value) return false;
        
        addNewLine(username + ': ' + msg.value);
        socket.emit('chat message', username + ': ' + msg.value);
        msg.value = '';
        return false;
    };

    backBtn.onclick = function (e) {
        window.location.pathname = '/'
    }

    socket.on('chat message', addNewLine);

    socket.on('message', addNewLine);

    function updateScroll(){
        let messageLines = document.querySelectorAll('li'),
            lastMessageHeight = messageLines ? messageLines[messageLines.length - 1].clientHeight : 0;

        if (messages.scrollTop >= messages.scrollHeight - messages.clientHeight - lastMessageHeight)
            messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    }

    messages.onscroll = function showScrollDownBtn() {
        let messageLines = document.querySelectorAll('li'),
            lastMessageHeight = messageLines ? messageLines[messageLines.length - 1].clientHeight : 0;

        if (messages.scrollTop < messages.scrollHeight - messages.clientHeight - lastMessageHeight)
            scrollDownBtn.classList.add('visible');
        else
            scrollDownBtn.classList.remove('visible');
    }

    scrollDownBtn.onclick = function scrollDown() {
        messages.scrollTop = messages.scrollHeight - messages.clientHeight;
    }
};