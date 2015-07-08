widgeto.controller('ModalLinkController', function ($scope, $rootScope, TemplateManager) {

    $scope.id = '';
    $scope.value = '';

    $rootScope.$on('modal-open', function (event, id, value) {
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });

    $scope.save = function () {
        $rootScope.$broadcast('modal-close', $scope.id, $scope.value);
        $('#modal-link').modal('hide');
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add('bower_components/widget-o/html/modal-link.html');
});

