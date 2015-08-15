widgeto.controller('EditTextareaController', function (
        $scope, 
        WidgetManager, EnableManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';

    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        return true;
    };
    
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

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-textarea', 
            'bower_components/widget-o/html/edit-textarea.html');
});


