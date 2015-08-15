widgeto.controller('EditLinkController', function (
        $scope, 
        WidgetManager, EnableManager, Page) {

    EnableManager.add($scope);
    $scope.isEnabled = false;

    $scope.id = '';
    $scope.value = '';
    $scope.hrefs = [];
    
    $scope.set = function (id) {
        console.log("Setting widget id to: " + id);
        $scope.id = id;
        $scope.value = WidgetManager.getScope(id);
        return true;
    };

    $scope.$watch('value.type', function() {
        $scope.hrefs = new Array();
        switch ($scope.value.type) {
            case 'section':
                var sections = $('section').toArray();
                for (var section in sections) {
                    var id = $(sections[section]).attr('id');
                    $scope.hrefs.push("#" + id);
                }
                break;
            case 'internal':
                Page.query({}, function(pages) {
                    pages.forEach(function (page) {
                        if (page.idsite) {
                           $scope.hrefs.push(page.idsite);
                        }
                    });
                });
                break;
        }
    });

});

widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'edit-link', 
            'bower_components/widget-o/html/edit-link.html');
});

