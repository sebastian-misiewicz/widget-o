widgeto.controller('MainController', function ($scope, $rootScope, $compile, TemplateManager, PageCache, Page) {

    TemplateManager.loadAll();

    $scope.idpage = PageCache.getIdPage();

    $scope.edit = function (id, type) {
        $rootScope.$broadcast('modal-open', id, getElement(id));
        $('#modal-edit').modal('show');
    };
    
    function getElement(id) {
        var ids = id.split("-");
        
        if (ids.length === 1) {
            return $scope.page[id];
        }
        var elements = $scope.page[ids[0]].elements;
        for (var i in elements) {
            if (elements[i].id === ids[1]) {
                return elements[i];
            }
        }
    }
    function setElement(id, value) {
        var ids = id.split("-");
        
        if (ids.length === 1) {
            $scope.page[id] = value;
        }
        var elements = $scope.page[ids[0]].elements;
        for (var i in elements) {
            if (elements[i].id === ids[1]) {
                elements[i] = value;
            }
        }
    }

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
        setElement(id, value);
    });

    $rootScope.$on('page-save', function () {
        Page.update({id: $scope.idpage}, $scope.page);
    });

    $rootScope.$on('page-reset', function () {
        Page.get({id: $scope.idpage}, function (page) {
            $scope.page = page;
        }, function () {
            // TODO sebastian show a proper error message on the website
            console.log('Failed to get the page: ' + $scope.idpage);
        });
    });

    $rootScope.$on('templates-loaded', function (event, id) {
        Page.get({id: $scope.idpage}, function (page) {
            $scope.page = page;
        }, function () {
            // TODO sebastian show a proper error message on the website
            console.log('Failed to get the page: ' + $scope.idpage);
        });
        console.log('Compiling ' + id);
        $compile($(id).contents())($scope);
        console.log('Compiled '+ id);
        $rootScope.$broadcast('compiled', id);
    });

});

// TODO global variables!
var current;
var inEdit = true;
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


