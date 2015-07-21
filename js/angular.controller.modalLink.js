widgeto.controller('ModalLinkController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';
    $scope.hrefs = [];
    
    $rootScope.$on('modal-open', function (event, id, value) {
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });

    $scope.save = function () {
        $rootScope.$broadcast('modal-close', $scope.id, $scope.value);
        $('#modal-link').modal('hide');
    };
    
    $scope.$watch('value.type', function() {
        switch ($scope.value.type) {
            case 'section':
                var sections = $('section').toArray();
                $scope.hrefs = new Array();
                for(var section in sections) {
                    var id = $(sections[section]).attr('id');
                    $scope.hrefs.push("#" + id);
                }
                break;
        }
    });

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add('bower_components/widget-o/html/modal-link.html');
});

