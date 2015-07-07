widgeto.service('TemplateManager', function($sce, $templateRequest, $compile) {
    
    var templates = [];
    
    this.add = function(templateFilePath) {
        templates.push(templateFilePath);
    };
    
    this.loadAll = function(scope) {
        var templateManager = this;
        templates.forEach(function (template) {
           templateManager.load(scope, template); 
        });
    },
    
    this.load = function (scope, templateFilePath) {
        var templateUrl = $sce.getTrustedResourceUrl(templateFilePath);
    
        $templateRequest(templateUrl).then(function(template) {
            $("body").append(template);
            $compile($("body").contents())(scope);
        }, function() {
            // TODO Add some exception throwing
        });
    };
    
});

