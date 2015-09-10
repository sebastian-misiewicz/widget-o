widgeto.controller('EditTextController', function (
        $scope, 
        WidgetManager) {

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
            'edit-text', 
            'bower_components/widget-o/html/edit-text.html');
});


