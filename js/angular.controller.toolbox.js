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
    
    $scope.fileUpload = function() {
        $rootScope.$broadcast('modal-file-upload-open');
    };
    
    $scope.fileManager = function() {
        $rootScope.$broadcast('modal-file-manager-open');
    };
    
    $scope.pageManager = function() {
        $rootScope.$broadcast('modal-page-manager-open');
    };
    
    $scope.editMeta = function() {
        $rootScope.$broadcast('edit-meta');
    };
    
    $scope.settings = function() {
        $rootScope.$broadcast('modal-settings-open');
    };
    
    var toggleModeOn = false;
    $scope.toggleWidgets = function() {
        toggleModeOn = !toggleModeOn;
        $(".widget-o-editable, .widget-o-managable").each(function () {
            if (toggleModeOn) {
                $(this).addClass('widget-o-toggle');
                if(this.nodeName.toLowerCase() === 'img' && this.src === "") {
                    this.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
                }
            } else {
                $(this).removeClass('widget-o-toggle');
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