widgeto.controller('ToolboxController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;
    
    $scope.isVisible = false;

    $scope.show = function() {
        $scope.isVisible = true;
    };
    $scope.hide = function() {
        $scope.isVisible = false;
    };
    
    $scope.save = function() {
        $rootScope.$broadcast('page-save');
    };
    
    $scope.reset = function() {
        $rootScope.$broadcast('page-reset');
    };
    
    $scope.stopEdit = function() {
        $rootScope.$broadcast('stop-edit');
    };
    
    $scope.addNew = function() {
        $rootScope.$broadcast('modal-add-new-page-open');
    };
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'toolbox',
            'bower_components/widget-o/html/toolbox.html',
            'body');
});