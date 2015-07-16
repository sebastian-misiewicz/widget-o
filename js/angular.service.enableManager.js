widgeto.service('EnableManager', function($rootScope) {
    
    var scopes = [];

    this.add = function(scope) {
        scopes.push(scope);
    };
    
    $rootScope.$on('login-success', function() {
        scopes.forEach(function (scope) {
            scope.isEnabled = true;
        });
    });
    
    $rootScope.$on('stop-edit', function() {
        scopes.forEach(function (scope) {
            scope.isEnabled = false;
        });
    });
    
});

