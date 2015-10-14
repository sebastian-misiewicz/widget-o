widgeto.controller('ConfigureWidgetController', function (
        $scope, $rootScope,
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
    
    $scope.addSampleJson = function(widgetName) {
        console.log(widgetName);
        var widget = WidgetManager.getWidget(widgetName);
        $rootScope.$broadcast('configure-widget', $scope.id, widget.sampleJson);
    };

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'configure-widget', 
            'bower_components/widget-o/html/configure-widget.html');
});


