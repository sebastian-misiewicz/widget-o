widgeto.controller('EditTextareaController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

    $rootScope.$on('modal-open', function (event, id, value) {
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'edit-text', 
            'bower_components/widget-o/html/edit-textarea.html', 
            '#modal-edit');
});


