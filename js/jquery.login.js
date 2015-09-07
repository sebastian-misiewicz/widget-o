function login() {
    $.get( "bower_components/widget-o/html/modal-login.html", function( data ) {
        $("body").append(data);
        $('#modal-login').modal('show');
    });
}


