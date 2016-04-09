widgeto.controller('EditOrderController', function (
        $scope, $rootScope, md5,
        WidgetManager) {

    $scope.id = '';
    $scope.value = '';

    $scope.widgets = WidgetManager.getAll();

    $scope.sample = {
        "id": "",
        "widgetName": ""
    };

    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        return true;
    };
    
    $scope.sortableOptions = {
        axis: 'y',
        stop: function() {
            $scope.reRender();
        }
    };
    
    $scope.reRender = function() {
        $rootScope.$broadcast('rerender-widgets', $scope.id);
    };
    
    $scope.remove = function(element) {
        var index = $scope.value.elements.indexOf(element);
        if (index > -1) {
            $scope.value.elements.splice(index, 1);
        }
        $scope.reRender();
    };
    
    $scope.add = function() {
        var widget = WidgetManager.getWidget($scope.sample.widgetName);
        
        if (!widget || !widget.sampleJson) {
            return;
        }
        
        var element = JSON.parse(JSON.stringify(widget.sampleJson));
        
        element.id = $scope.id + "_" + $scope.sample.widgetName + "_" + getHash();
        $scope.value.elements.push(element);
        $scope.reRender();
    };
    
    function getHash() {
        return md5.createHash(new Date().toString()).substring(1,7);
    }

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-elements', 
            'bower_components/widget-o/html/edit-order.html');
});


