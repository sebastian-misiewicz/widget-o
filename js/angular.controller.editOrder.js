widgeto.controller('EditOrderController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

    $rootScope.$on('modal-open', function (event, id, value) {
        console.log('edit-order received!');
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'edit-text', 
            'bower_components/widget-o/html/edit-order.html', 
            '#modal-edit');
});


