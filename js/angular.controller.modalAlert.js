widgeto.controller('ModalAlertController', function (
        $scope, $rootScope) {

    $rootScope.$on('modal-alert-open', function (event, type, title, message) {
            setScope(type, title, message);
            $('#modal-alert').modal('show');
    });
    $rootScope.$on('modal-alert-popup', function (event, type, title, message) {
            setScope(type, title, message);
            $('#modal-alert').modal('show');
            setTimeout(function () {
                $('#modal-alert').modal('hide');  
            }, 1500);
    });
    
    function setScope(type, title, message) {
        $scope.type = type;
        $scope.title = title;

        console.log(message);

        switch (message) {
            case 403:
                $scope.message = "403 - Forbidden - Log in first.";
                break;
            case 404:
                $scope.message = "403 - Page Not Found.";
                break;
            default:
                $scope.message = message;
                break;
        }
    }
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-alert', 
            'bower_components/widget-o/html/modal-alert.html',
            'body');
});


