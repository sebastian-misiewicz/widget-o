widgeto.service('WidgetManager', function($sce, $templateRequest) {
    
    var widgets = [];
    var scopes = [];
    
    this.addScope = function(id, scope) {
        scopes[id] = scope;
    };
    
    this.getScope = function(id) {
        return scopes[id];
    };
    
    this.add = function(name, templatePath, sampleJson) {
        var templateUrl = $sce.getTrustedResourceUrl(templatePath);
        
        $templateRequest(templateUrl).then(function(template) {
            console.log("Loaded widget: " + name);
            widgets.push({
                "name": name,
                "template": template,
                "sampleJson": sampleJson
            });
        }, function() {
            console.log("Failed to load widget: " + name);
        });
        
    };
    
    this.get = function(name) {
        for (var index in widgets) {
            if (widgets[index].name === name) {
                return widgets[index].template;
            }
        }
        
        return '';
    };
    
    this.getWidget = function(name) {
        for (var index in widgets) {
            if (widgets[index].name === name) {
                return widgets[index];
            }
        }
        
        return '';
    };
    
    this.getAll = function() {
        var widgetNames = [];
        for (var index in widgets) {
            widgetNames.push(widgets[index].name);
        }
        return widgetNames;
    };
    
});

