widgeto.controller('MainController', function (
        $scope, $rootScope, $compile, $sce, $templateRequest, $q,
        TemplateManager, WidgetManager,
        PageCache, Page, Render) {

    TemplateManager.loadAll();

    $scope.idpage = PageCache.getIdPage();

    $scope.edit = function (id, type) {
        $rootScope.$broadcast('modal-open', id, getElement(id));
        $('#modal-edit').modal('show');
    };
    
    function getElement(id) {
        console.log("Getting an element with ID " + id);
        if ($scope.page[id]) {
            console.log("Found parent element for edit: " + id);
            return $scope.page[id];
        }
        
        for (var parent in $scope.page) {
            var elements = $scope.page[parent].elements;
            if (elements) {
                for (var i in elements) {
                    if (elements[i].id === id) {
                        console.log("Found child element for edit: " + id);
                        return elements[i];
                    }
                }
            }
        }
    }
    function setElement(id, value) {
        // TODO sebastian Let's revise the use of this function later
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
    
    $rootScope.$on('page-render', function () {
        Render.save({
            "idpage": $scope.idpage,
            "html": $('html').html()
        }, function () {
            console.log("render success");
        }, function () {
            console.log("render failed");
        });
            
    });

    $rootScope.$on('templates-loaded', function (event, id) {
        Page.get({id: $scope.idpage}, function (page) {
            if(!$scope.page) {
               $scope.page = page;
            }
        }, function () {
            // TODO sebastian show a proper error message on the website
            console.log('Failed to get the page: ' + $scope.idpage);
        }); 
        console.log('Compiling ' + id);
        $compile($(id).contents())($scope);
        console.log('Compiled '+ id);
        $rootScope.$broadcast('compiled', id);
    });
    
    $scope.toText = function(elements) {
        var text = "";
        for (var i in elements) {
            var element = elements[i];
            if (!element.tag) {
                text += element.text;
                continue;
            }
            
            switch (element.tag) {
                case "p":
                    text += "<p>";
                    break;
                case "p-close":
                    text += "</p>";
                    break;
                case "b":
                    text += "<b>";
                    break;
                case "b-close":
                    text += "</b>";
                    break;
                case "i":
                    text += "<i>";
                    break;
                case "i-close":
                    text += "</i>";
                    break;
            }
        }
        
        return text;
    };
    
    $scope.widgets = [];

    $rootScope.$on('rerender-widgets', function (event, id) {
        console.log('Caught rerender-widgets of id: ' + id);
        $scope.renderWidgets(id, true);
    });
    
    $scope.renderWidgets = function(parent, force) {
        if (!$scope.page) {
            return false;
        }
        
        var elements = $scope.page[parent].elements;
        if (!elements) {
            return false;
        }

        // Block multi-rendering
        if ($scope.widgets[parent] && !force) {
            return true;
        }
        
        $scope.widgets[parent] = true;

        console.log($("#" + parent));
        $("#" + parent).html("");
        console.log("Appending widgets for parent " + parent);
        for(var index in elements) {
            var element = elements[index];
            console.log("Appending widget " + element.id);
            WidgetManager.addScope(element.id, element);
            $("#" + parent).append(
                    WidgetManager.get(element.widget)
                        .replace("[[ID]]", element.id));
        }
        $compile($("#" + parent).contents())($scope);
        return false;
    };
    
    $scope.$watch("widgets", function() {
        console.log("Widgets CHANGED");
    });

});

// TODO global variables!
var current;
var currentManage;
var inEdit = true;
function edit() {
    var scope = angular.element($("#" + current)).scope();
    if (!current) {
        throw new Error("Element id doesn't exist");
    }
    scope.edit(current);
}
function manage() {
    var scope = angular.element($("#" + currentManage)).scope();
    if (!currentManage) {
        throw new Error("Element id doesn't exist");
    }
    scope.edit(currentManage);
}

$("body").on("mouseenter", ".widget-o-editable", function (e) {
    if (inEdit) {
        // Taken from http://stackoverflow.com/a/12274958 Thanks.
        $(this).popover({
            content: '<button type="button" style="z-index: 999" class="btn btn-default" onclick="edit()"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit</button>',
            trigger: "manual",
            html: true,
            template: '<div class="popover" style="z-index: 999" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
        });
        $('.modal-dialog').draggable({
            handle: ".modal-header"
        });
        current = e.currentTarget.id;
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

$("body").on("mouseenter", ".widget-o-managable", function (e) {
    if (inEdit) {
        // Taken from http://stackoverflow.com/a/12274958 Thanks.
        $(this).popover({
            content: '<button type="button" style="z-index: 999" class="btn btn-default" onclick="manage()"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Manage</button>',
            trigger: "manual",
            html: true,
            placement: "bottom",
            template: '<div class="popover" style="z-index: 999" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
        });
        currentManage = e.currentTarget.id;
        $(this).popover('show');
    }
});
$("body").on("mouseleave", ".widget-o-managable", function () {
    if (inEdit) {
        var ref = $(this);
        timeoutObj = setTimeout(function () {
            ref.popover('hide');
        }, 50);
    }
});


