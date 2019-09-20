let messageColor;
switch (Math.floor(Math.random() * (6 - 1)) + 1) {
    case 1: messageColor = 'secondary'; break;
    case 2: messageColor = 'danger'; break;
    case 3: messageColor = 'success'; break;
    case 4: messageColor = 'warning'; break;
    case 5: messageColor = 'info'; break;
    case 6: messageColor = 'light'; break;
}

$(() => {
    const socket = io.connect();

    let $form    = $('#message-form');
    let $user    = $('#user');
    let $message = $('#message');
    let $chat    = $('#chat');

    $form.submit((event) => {
        event.preventDefault();

        if ('' === $user.val() || '' === $message.val())
            return;

        socket.emit('send', {user: $user.val(), message: $message.val(), color: messageColor});
        $message.val('');
    });

    socket.on('addMessage', (data) => {
        $chat.append('<div class="alert alert-' + data.color + '"><b>' + data.user + '</b>: ' + data.message + '</div>');
    });
});
