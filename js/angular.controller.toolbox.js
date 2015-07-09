widgeto.controller('ToolboxController', function ($scope, $rootScope) {

    $scope.isVisible = false;

    $scope.show = function() {
        $scope.isVisible = true;
    };
    $scope.hide = function() {
        $scope.isVisible = false;
    };
    
    
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add('bower_components/widget-o/html/toolbox.html');
});