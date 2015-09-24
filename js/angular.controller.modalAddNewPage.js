widgeto.controller('ModalAddNewPageController', function ($scope, $rootScope, Template, Page) {

    $scope.saveFailed = false;
    $scope.saveSucceeded = false;
    
    $scope.value = {
        "idsite": "",
        "template": ""
    };

    $rootScope.$on('modal-add-new-page-open', function () {
        $scope.templates = Template.query();
        $scope.pages = Page.query();
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
    
    $scope.deletePage = function (page) {
        var idpage = page.idpage;
        Page.delete({id: page.idpage}, function () {
            $rootScope.$broadcast('modal-alert-open', 'success', 'Deleted page ' + idpage);
            $scope.pages = Page.query();
        }, function (e) {
            $rootScope.$broadcast('modal-alert-open', 'danger', 'Page delete failed', e.status);
        });
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-add-new-page', 
            'bower_components/widget-o/html/modal-add-new-page.html',
            'body');
});

