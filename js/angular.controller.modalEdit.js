widgeto.controller('ModalEditController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = null;
    
    $scope.elements = [];

    $rootScope.$on('modal-open', function (event, id, value) {
        console.log('modal-edit-opened');
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });
    
    $scope.$watch('value', function () {
        console.log("New Value has arrived!");
        var value = $scope.value;
        
        for (var i in value) {
            var element = value[i];
            if (element.text) {
                $scope.elements.push(element);
            }
        }
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-edit', 
            'bower_components/widget-o/html/modal-edit.html',
            'body',
            '#modal-edit-body');
});


