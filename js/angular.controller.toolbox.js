widgeto.controller('ToolboxController', function ($scope, $rootScope) {

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
    
    $scope.render = function() {
        $rootScope.$broadcast('page-render');
    };
    
    $scope.reset = function() {
        $rootScope.$broadcast('page-reset');
    };
    
    $scope.logout = function() {
        $rootScope.$broadcast('logout');
    };
    
    $scope.addNew = function() {
        $rootScope.$broadcast('modal-add-new-page-open');
    };
    
    $scope.fileUpload = function() {
        $rootScope.$broadcast('modal-file-upload-open');
    };
    
    $scope.fileManager = function() {
        $rootScope.$broadcast('modal-file-manager-open');
    };
    
    $scope.fileManager = function() {
        $rootScope.$broadcast('modal-page-manager-open');
    };
    
    $scope.toggleWidgets = function() {
        $(".widget-o-editable, .widget-o-managable").each(function () {
            if ($(this).hasClass('widget-o-toggle')) {
                $(this).removeClass('widget-o-toggle');
            } else {
                $(this).addClass('widget-o-toggle');
            }
        });
    };
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'toolbox',
            'bower_components/widget-o/html/toolbox.html',
            'body');
});