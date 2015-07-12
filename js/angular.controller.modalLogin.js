widgeto.controller('ModalLoginController', function ($scope, $rootScope, $http) {

    $scope.loginFailed = false;

    $scope.login = function () {
            // TODO Make it more secure
        $http.defaults.headers.common['auth-token'] = '{"username":"' + $scope.username + '", "password":"' + $scope.password + '"}';
        $http.post('rest/login.html', {
        }).success(function () {
//            $http.defaults.headers.common['auth-token'] = $scope.username + ':' + $scope.password;
            $scope.loginFailed = false;
            $('#modal-login').modal('hide');
        }).error(function () {
            $scope.loginFailed = true;
        });
    };
    
    $rootScope.$on('body-compiled', function() {
        $('#modal-login').modal('show');
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add('bower_components/widget-o/html/modal-login.html');
});


