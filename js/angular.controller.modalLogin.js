widgeto.controller('ModalLoginController', function ($scope, $rootScope, $http) {

    $scope.login = function () {
        $http.post('rest/login.html', {
            username: $scope.username,
            password: $scope.password
        }).success(function () {
            // TODO Make it more secure
            $http.defaults.headers.common['auth-token'] = $scope.username + ':' + $scope.password;
        });
    };
    
    $rootScope.$on('body-compiled', function() {
        $('#modal-login').modal('show');
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add('bower_components/widget-o/html/modal-login.html');
});


