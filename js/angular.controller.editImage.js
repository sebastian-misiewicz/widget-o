widgeto.controller('EditImageController', function (
        $scope, $http, 
        WidgetManager) {

    $scope.id = '';
    $scope.value = '';
    $scope.files = [];
    
    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        $http.get("rest/file/image")
            .then(
                function (response) {
                    $scope.files = response.data.files || [];
                }
            );
        return true;
    };
    
});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-src', 
            'bower_components/widget-o/html/edit-image.html',
            {
                "src": "http://someimage.url.com",
                "alt": "Some image text",
                "width": ""
            });
});

