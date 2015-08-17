widgeto.controller('EditBooleanController', function (
        $scope, 
        EnableManager, WidgetManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        return true;
    };

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-boolean', 
            'bower_components/widget-o/html/edit-boolean.html');
});

