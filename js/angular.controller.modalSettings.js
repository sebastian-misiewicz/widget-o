widgeto.controller('ModalSettingsController', function (
        $scope, $rootScope, User) {

    $rootScope.$on('modal-settings-open', function (event) {
            $('#modal-settings').modal('show');
    });
    
    $scope.savePassword = function() {
        User.update(
                {username: $scope.value.username}, 
                {
                    "newPassword": $scope.value.newPassword,
                    "oldPassword": $scope.value.oldPassword
                },
                function () {
                    $rootScope.$broadcast('modal-alert-popup', 'success', 'Password updated');
                },
                function (e) {
                    $rootScope.$broadcast('modal-alert-open', 'danger', 'Password update failed', e.status);
                });
    };
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-settings', 
            'bower_components/widget-o/html/modal-settings.html',
            'body');
});


