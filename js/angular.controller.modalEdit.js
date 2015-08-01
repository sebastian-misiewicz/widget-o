widgeto.controller('ModalEditController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';

    $rootScope.$on('modal-open', function (event, id, value) {
        console.log('modal-edit-opened');
        console.log(value);
        $scope.$apply(function () {
            $scope.id = id;
        });
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-edit', 
            'bower_components/widget-o/html/modal-edit.html',
            'body',
            '#modal-edit-body');
});


