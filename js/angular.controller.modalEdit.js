widgeto.controller('ModalEditController', function (
        $scope, $rootScope, $compile,
        WidgetManager) {

    $scope.id = '';
    $scope.value = null;

    $rootScope.$on('modal-open', function (event, id, value) {
        console.log('modal-edit-opened');
        $scope.safeApply(function () {
            $scope.id = id;
            $scope.value = value;
            render();
        });
    });
    
    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase == '$apply' || phase == '$digest') {
            if (fn && (typeof (fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };
    
    $scope.toggleEdit = function () {
        $scope.value.isEdit = !$scope.value.isEdit;
    };
    
    $scope.togglePanel = function () {
        $scope.value.isPanel = !$scope.value.isPanel;
    };
    
    function render() {
        var value = $scope.value,
            modalBody = $("#modal-edit-body");
        
        modalBody.html("");
        
        if(!value) {
            appendWidget(modalBody, $scope.id, "configure-widget", value);
        } else {
            for (var i in value) {
                var element = value[i];
                appendEditWidget(modalBody, $scope.id, i, value);
                if (element !== null && typeof element === 'object') {
                    for(var item in element) {
                        appendEditWidget(modalBody, i, item, element);
                    }
                }
            }
        }
        
        $compile(modalBody.contents())($scope);
    }

    function appendEditWidget(modalBody, id, editType, elementToEdit) {
        appendWidget(modalBody, id, "edit-" + editType, elementToEdit);
    }
    
    function appendWidget(modalBody, id, widget, elementToEdit) {
        var template = WidgetManager.get(widget);
        if (!template) {
            return;
        }
        
        WidgetManager.addScope(id, elementToEdit);
        modalBody.append(template.replace("[[ID]]", id));
    }
    
});

widgeto.run(function (TemplateManager) {
    TemplateManager.add(
            '#modal-edit', 
            'bower_components/widget-o/html/modal-edit.html',
            'body',
            '#modal-edit-body');
});


