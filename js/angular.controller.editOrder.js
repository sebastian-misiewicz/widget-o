widgeto.controller('EditOrderController', function (
        $scope, $rootScope,
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
    
    $scope.sortableOptions = {
        axis: 'y'
    };
    
    $scope.reRender = function() {
        $rootScope.$broadcast('rerender-widgets', $scope.id);
    };
    
    $scope.remove = function(element) {
        var index = $scope.value.elements.indexOf(element);
        if (index > -1) {
            $scope.value.elements.splice(index, 1);
        }
    };
    
    $scope.add = function() {
        var element = JSON.parse(JSON.stringify($scope.value.sample));
        element.id = $scope.sampleId;
        element.text = $scope.sampleText;
        
        $scope.value.elements.push(element);
    };

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-elements', 
            'bower_components/widget-o/html/edit-order.html');
});


