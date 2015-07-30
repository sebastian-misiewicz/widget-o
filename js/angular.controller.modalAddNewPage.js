widgeto.controller('ModalAddNewPageController', function ($scope, $rootScope, EnableManager, Template, Page) {

    EnableManager.add($scope);
    $scope.isEnabled = false;
    $scope.saveFailed = false;
    $scope.saveSucceeded = false;
    
    $scope.value = {
        "idsite": "",
        "template": ""
    };

    $rootScope.$on('modal-add-new-page-open', function () {
        $scope.templates = Template.query();
        $('#modal-add-new-page').modal('show');
    });

    $scope.save = function () {
        Page.save($scope.value, function () {
            $scope.saveFailed = false;
            $scope.saveSucceeded = true;
        }, function () {
            $scope.saveSucceeded = false;
            $scope.saveFailed = true;
        });
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-add-new-page', 
            'bower_components/widget-o/html/modal-add-new-page.html',
            'body');
});

