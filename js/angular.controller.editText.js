widgeto.controller('EditTextController', function (
        $scope, 
        EnableManager, WidgetManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

//    $rootScope.$on('modal-open', function (event, id, value) {
//        $scope.$apply(function () {
//            $scope.id = id;
//            $scope.value = value;
//        });
//    });
    
    $scope.id;

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


