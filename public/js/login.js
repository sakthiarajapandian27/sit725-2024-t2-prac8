$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault(); 

        const username = $('#username').val();
        const password = $('#password').val();
        
        $.ajax({
            url: '/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: username,
                password: password
            }),
            success: function(response) {
                 if (response.message === "successful") {
                    localStorage.setItem('Admin', JSON.stringify(response.result.firstName));
                    window.location.href = '/';
                } else {
                    displayError(response.message);
                }
            },
            error: function(error) {
                console.log('Error:', error);
            }
        });
    });

    function displayError(message) {
        $('#error-message').text(message).css('color', 'red');
    }
});