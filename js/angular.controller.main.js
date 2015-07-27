widgeto.controller('MainController', function ($scope, $rootScope, $compile, TemplateManager, PageCache, Page) {

    TemplateManager.loadAll();

    $scope.idpage = PageCache.getIdPage();

    $scope.edit = function (id, type) {
        $rootScope.$broadcast('modal-open', id, $scope.page[id].value);
        $('#modal-' + type).modal('show');
    };

    $scope.startEdit = function () {
        console.log('Starting the edit mode');
        $rootScope.$broadcast('start-edit');
    };

    $rootScope.$on('login-success', function () {
        inEdit = true;
    });

    $rootScope.$on('stop-edit', function () {
        console.log('Stopping the edit mode');
        inEdit = false;
    });

    $rootScope.$on('modal-close', function (event, id, value) {
        $scope.page[id].value = value;
    });

    $rootScope.$on('page-save', function (event) {
        Page.update({id: $scope.idpage}, $scope.page);
    });

    $rootScope.$on('page-reset', function (event) {
        Page.get({id: $scope.idpage}, function (page) {
            $scope.page = page;
        }, function () {
            // TODO sebastian show a proper error message on the website
            console.log('Failed to get the page: ' + $scope.idpage);
        });
    });

    $rootScope.$on('templates-loaded', function () {
        Page.get({id: $scope.idpage}, function (page) {
            $scope.page = page;
        }, function () {
            // TODO sebastian show a proper error message on the website
            console.log('Failed to get the page: ' + $scope.idpage);
        });
        $compile($("body").contents())($scope);
        console.log('body got compiled');
        $rootScope.$broadcast('body-compiled');

    });

});

// TODO global variables!
var current;
var inEdit = false;
function edit() {
    var scope = angular.element($("#" + current)).scope();
    if (!current) {
        throw new Error("Element id doesn't exist");
    }
    var classList = $("#" + current).attr('class').split(/\s+/);
    var widgetClassPrefix = 'widget-o-widget-';
    $.each(classList, function (index, item) {
        if (item.substring(0, widgetClassPrefix.length) === widgetClassPrefix) {
            scope.edit(current, item.substring(widgetClassPrefix.length));
        }
    });

}

$("body").on("mouseenter", ".widget-o-editable", function (e) {
    if (inEdit) {
        // Taken from http://stackoverflow.com/a/12274958 Thanks.
        $(this).popover({
            content: '<button type="button" class="btn btn-default" onclick="edit()"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit</button>',
            trigger: "manual",
            html: true,
            template: '<div class="popover" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
        });
        current = e.target.id;
        $(this).popover('show');
    }
});
$("body").on("mouseleave", ".widget-o-editable", function () {
    if (inEdit) {
        var ref = $(this);
        timeoutObj = setTimeout(function () {
            ref.popover('hide');
        }, 50);
    }
});


