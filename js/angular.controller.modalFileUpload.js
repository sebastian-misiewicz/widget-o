widgeto.controller('ModalFileUploadController', function ($scope, $rootScope, EnableManager, Template, Page) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.value = {
        "idsite": "",
        "template": ""
    };

    $scope.options = {
        url: "url"
    };

    $rootScope.$on('modal-file-upload-open', function () {
        $scope.templates = Template.query();
        $('#modal-file-upload').modal('show');
    });


});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-file-upload',
            'bower_components/widget-o/html/modal-file-upload.html',
            'body');
});

