widgeto.controller('EditTextareaController', function (
        $scope, 
        WidgetManager) {

    $scope.id = '';
    $scope.value = '';

    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        return true;
    };
    
    $scope.tinymceOptions = {
        inline: false,
        plugins : 'link image table',
        tools: 'inserttable'
    };
    
    $(document).on('focusin', function(e) {
        if ($(e.target).closest(".mce-window").length) {
            e.stopImmediatePropagation();
        }
    });

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-textarea', 
            'bower_components/widget-o/html/edit-textarea.html',
            {
                "textarea": "This is a sample text"
            });
});


