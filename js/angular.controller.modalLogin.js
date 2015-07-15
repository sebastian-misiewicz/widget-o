widgeto.controller('ModalLoginController', function ($scope, $rootScope, $http, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.loginFailed = false;

    $scope.login = function () {
        // TODO Make it more secure
        $http.defaults.headers.common['auth-token'] = '{"username":"' + $scope.username + '", "password":"' + $scope.password + '"}';
        $http.post('rest/login.html', {
        }).success(function () {
            $scope.loginFailed = false;
            $('#modal-login').modal('hide');
        }).error(function () {
            $scope.loginFailed = true;
        });
    };
    
    $rootScope.$on('start-edit', function() {
        $('#modal-login').modal('show');
    });
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add('bower_components/widget-o/html/modal-login.html');
});


