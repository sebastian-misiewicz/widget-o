widgeto.controller('EditImageController', function (
        $scope, $rootScope, $http, 
        EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';
    $scope.files = [];
    
    $rootScope.$on('modal-open', function (event, id, value) {
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
        
        $http.get("rest/file/image")
            .then(
                function (response) {
                    $scope.files = response.data.files || [];
                }
            );
    });
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'edit-image', 
            'bower_components/widget-o/html/edit-image.html', 
            '#modal-edit');
});

