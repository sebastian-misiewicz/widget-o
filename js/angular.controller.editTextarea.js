widgeto.controller('EditTextareaController', function ($scope, $rootScope, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

    $rootScope.$on('modal-open', function (event, id, value) {
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
        });
    });
    
    $scope.sortableOptions = {
        axis: 'y'
    };
    
    $scope.addTag = function (tag) {
        $scope.value.textarea.push({ "tag": tag });
        $scope.value.textarea.push({ "tag": tag + "-close" });
    };
    
    $scope.addText = function () {
        $scope.value.textarea.push({ "text": "Some text" });
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'edit-text',
            'bower_components/widget-o/html/edit-textarea.html',
            '#modal-edit');
});


