widgeto.controller('ModalFileUploadController', function (
        $scope, $rootScope,
        EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.value = {
        "idsite": "",
        "template": ""
    };

    $scope.options = {
        url: "rest/file"
    };
    
    $rootScope.$on('modal-file-upload-open', function () {
        $('#modal-file-upload').modal('show');
    });
    
    $scope.$watch('queue', function() {
        console.log($scope);
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-file-upload',
            'bower_components/widget-o/html/modal-file-upload.html',
            'body');
});

