$(document).ready(function() {
    $('.btn1').click(function(event) {
        event.preventDefault();
        var n1 = 5; 
        var n2 = 10;
        $.ajax({
            url: '/addTwoNumber',
            type: 'GET',
            data: { n1: n1, n2: n2 },
            success: function(response) {
                alert("The result is: " + response.data);
            },
            error: function() {
                alert("An error occurred while adding the numbers.");
            }
        });
    });

    $('.btn2').click(function(event) {
        event.preventDefault();
        
        var userConfirmed = confirm("Are you sure you want to buy this?");
        
        if (userConfirmed) {
            window.location.href = $(this).attr('href');
 
        }
    });
});
