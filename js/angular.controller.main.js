widgeto.controller('MainController', function ($scope, $rootScope, $compile, TemplateManager, PageCache, Page) {
   
    TemplateManager.loadAll();
   
    $scope.idpage = PageCache.getIdPage();
    $scope.page = PageCache.getPage();
    
    $scope.edit = function(id, type) {
        $rootScope.$broadcast('modal-open', id, $scope.page[id].value);
        $('#modal-' + type).modal('show');
    };
    
    $scope.startEdit = function() {
        console.log('Starting the edit mode');
        $rootScope.$broadcast('start-edit');
        inEdit = true;
    };
    
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
        }, function() {
            // TODO sebastian show a proper error message on the website
            console.log('Failed to get the page: ' + $scope.idpage);
        });
    });
    
    $rootScope.$on('templates-loaded', function () {
        $compile($("body").contents())($scope);
        $rootScope.$broadcast('body-compiled');
    });
    
});

// TODO global variables!
var current;
var inEdit = false;
function edit() {
    var scope = angular.element($("#"+current)).scope();
    if (!current) {
        throw new Error("Element id doesn't exist");
    }
    var classList = $("#"+current).attr('class').split(/\s+/);
    var widgetClassPrefix = 'widget-o-widget-';
    $.each( classList, function(index, item){
        if (item.substring(0, widgetClassPrefix.length) === widgetClassPrefix) {
           scope.edit(current, item.substring(widgetClassPrefix.length));
        }
    });
    
}

/*
 * Taken from http://stackoverflow.com/a/12274958.
 * Thanks.
 */
$('.widget-o-editable').popover({
    content: '<button type="button" class="btn btn-default" onclick="edit()"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> Edit</button>',
    trigger: "manual",
    html: true,
    template: '<div class="popover" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
}).mouseenter(function(e) {
    current = e.target.id;
    if (inEdit) {
        $(this).popover('show');
    }
}).mouseleave(function(e) {
    var ref = $(this);
    timeoutObj = setTimeout(function(){
        ref.popover('hide');
    }, 50);
});
