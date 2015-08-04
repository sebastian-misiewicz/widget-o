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
    
    $scope.remove = function (element) {
        var index = $scope.value.textarea.indexOf(element);
        if (index > -1) {
            $scope.value.textarea.splice(index, 1);
        }
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            'edit-text',
            'bower_components/widget-o/html/edit-textarea.html',
            '#modal-edit');
});


