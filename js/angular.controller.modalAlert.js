widgeto.controller('ModalAlertController', function (
        $scope, $rootScope,
        EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $rootScope.$on('modal-alert-open', function (event, type, title, message) {
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
            $('#modal-alert').modal('show');
    });
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-alert', 
            'bower_components/widget-o/html/modal-alert.html',
            'body');
});


