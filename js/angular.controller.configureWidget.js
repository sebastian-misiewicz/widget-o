widgeto.controller('ConfigureWidgetController', function (
        $scope, 
        WidgetManager) {

    $scope.id = '';
    $scope.value = '';

    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        
        $scope.widgets = WidgetManager.getAll();
        
        return true;
    };

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'configure-widget', 
            'bower_components/widget-o/html/configure-widget.html');
});


