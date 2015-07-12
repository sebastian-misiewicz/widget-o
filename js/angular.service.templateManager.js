widgeto.service('TemplateManager', function($rootScope, $sce, $templateRequest, $compile) {
    
    var templates = [];
    var templatesCount;

    this.add = function(templateFilePath) {
        templates.push(templateFilePath);
    };
    
    this.loadAll = function() {
        var templateManager = this;
        templatesCount = templates.length;
        templates.forEach(function (template) {
           templateManager.load(template); 
        });
    },
    
    $rootScope.$watch(function () {
        return templatesCount;
    }, function() {
        if (templatesCount === 0) {
            $rootScope.$broadcast('templates-loaded');
        }
    });
    
    this.load = function (templateFilePath) {
        var templateUrl = $sce.getTrustedResourceUrl(templateFilePath);
    
        $templateRequest(templateUrl).then(function(template) {
            $("body").append(template);
            templatesCount--;
        }, function() {
            // TODO Add some exception throwing
        });
    };
    
});

