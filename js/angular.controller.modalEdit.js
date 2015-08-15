widgeto.controller('ModalEditController', function (
        $scope, $rootScope, $compile,
        EnableManager, WidgetManager) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = null;

    $rootScope.$on('modal-open', function (event, id, value) {
        console.log('modal-edit-opened');
        $scope.$apply(function () {
            $scope.id = id;
            $scope.value = value;
            render();
        });
    });
    
    function render() {
        var value = $scope.value,
            modalBody = $("#modal-edit-body");
        
        modalBody.html("");
        for (var i in value) {
            var element = value[i];
            if (element !== null && typeof element === 'object') {
                for(var item in element) {
                    WidgetManager.addScope(i, element);
                    modalBody.append(
                            WidgetManager.get("edit-" + item)
                                .replace("[[ID]]", i));
                }
            }
        }
        $compile(modalBody.contents())($scope);
    };

});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-edit', 
            'bower_components/widget-o/html/modal-edit.html',
            'body',
            '#modal-edit-body');
});


