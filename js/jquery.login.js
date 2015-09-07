function showLoginModal() {
    $.get( "bower_components/widget-o/html/modal-login.html", function( data ) {
        $("body").append(data);
        $('#modal-login').modal('show');
    });
}

function login() {
    var username = $("#modal-login-username").val(),
        password = $("#modal-login-password").val();

    $.ajax({
        type: "POST",
        url: "rest/login/",
        dataType: 'json',
        data: JSON.stringify({ 
            "username": username,
            "password": password
        })
    })
    .done(function (data) {
        console.log(data); 
    })
    .fail(function () {
        $("#modal-login-alert").show();
    });
}
