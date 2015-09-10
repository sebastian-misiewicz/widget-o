widgeto.controller('ModalLoginController', function ($scope, $rootScope, $http) {

    $scope.loginFailed = false;

    $scope.login = function () {
        // TODO Make it more secure
        $http.defaults.headers.common['auth-token'] = '{"username":"' + $scope.username + '", "password":"' + $scope.password + '"}';
        $http.post('rest/login/', {
            }).success(function () {
                $scope.loginFailed = false;
                $('#modal-login').modal('hide');
                $rootScope.$broadcast('login-success');
            }).error(function () {
                $scope.loginFailed = true;
            });
    };
    
    $rootScope.$on('start-edit', function() {
        $('#modal-login').modal('show');
    });
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'modal-login', 
            'bower_components/widget-o/html/modal-login.html',
            'body');
});


