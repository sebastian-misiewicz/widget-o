widgeto.controller('ModalFileManagerController', function (
        $scope, $rootScope, $http,
        EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.value = {
        "idsite": "",
        "template": ""
    };

    $scope.files = [];
    
    $rootScope.$on('modal-file-manager-open', function () {
        $http.get("rest/file")
            .then(
                function (response) {
                    $scope.files = response.data.files || [];
                }
            );
        
        $('#modal-file-manager').modal('show');
    });
    
    $scope.delete = function (file) {
        // TODO sebastian implement
    };
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-file-manager',
            'bower_components/widget-o/html/modal-file-manager.html',
            'body');
});

