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
        Cookies.set('auth-token', data);
        location.reload();
    })
    .fail(function () {
        $("#modal-login-alert").show();
    });
}

$("body").on("keypress", ".login-input", function (e) {
    if (e.which === 13) {
        login();
        return false;
    }
});
