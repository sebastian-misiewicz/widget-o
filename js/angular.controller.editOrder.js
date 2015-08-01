widgeto.controller('EditOrderController', function ($scope, $rootScope, EnableManager) {

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
    
    $scope.remove = function(element) {
        var index = $scope.value.elements.indexOf(element);
        if (index > -1) {
            $scope.value.elements.splice(index, 1);
        }
    };
    
    $scope.add = function() {
        var element = JSON.parse(JSON.stringify($scope.value.sample));
        element.id = $scope.sampleId;
        
        $scope.value.elements.push(element);
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'edit-text', 
            'bower_components/widget-o/html/edit-order.html', 
            '#modal-edit');
});


