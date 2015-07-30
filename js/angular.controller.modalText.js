widgeto.controller('ModalTextController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

    $rootScope.$on('modal-open', function (event, id, value) {
        console.log('modal-text-opened');
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });

    $scope.save = function () {
        $rootScope.$broadcast('modal-close', $scope.id, $scope.value);
        $('#modal-text').modal('hide');
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-text', 
            'bower_components/widget-o/html/modal-text.html', 
            '#modal-edit');
});


