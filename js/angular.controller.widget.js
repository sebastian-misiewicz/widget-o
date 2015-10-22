widgeto.controller('WidgetController', function ($scope, WidgetManager) {

    $scope.set = function (id) {
        $scope.id = id;
        $scope.element = WidgetManager.getScope(id);
        return true;
    };
    
});