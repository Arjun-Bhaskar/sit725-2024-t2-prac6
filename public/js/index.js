$(document).ready(function() {
    $('#signup-form').on('submit', function(event) {
        event.preventDefault();

        const formData = {
            fullName: $('#full_name').val(),
            email: $('#email').val(),
            phoneNo: $('#mobile').val(),
            password: $('#password').val()
        };

        $.ajax({
            url: '/create/user',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                console.log(response);
                alert(response.message);
                $('#display-fullName').text(response.fullName);
                $('#display-email').text(response.email);
                $('#display-phoneNo').text(response.phoneNo);
                $('#display-password').text(response.password);
            },
            error: function(error) {
                console.error('Error response:', error);
                let message = 'An error occurred'; 
                if (error.responseJSON && error.responseJSON.message) {
                    message = error.responseJSON.message;
                }
                alert('Error: ' + message); 
            }
        });
    });
});