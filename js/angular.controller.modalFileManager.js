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
        $http.delete("rest/file", { "params": {"files[]": file.name} })
            .then(
                function (response) {
                    fileRemovedSuccess(response, file);
                }, function () {
                    fileRemovedFailed(file);
                }
            );
    };
    
    function fileRemovedSuccess(response, file) {
        if (response.data[file.name]) {
            var index = $scope.files.indexOf(file);
            if (index > -1) {
                $scope.files.splice(index, 1);
            }
        } else {
            fileRemovedFailed(file);
        }
    };
    
    function fileRemovedFailed(file) {
        file.error = 'Error';
    };
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-file-manager',
            'bower_components/widget-o/html/modal-file-manager.html',
            'body');
});

