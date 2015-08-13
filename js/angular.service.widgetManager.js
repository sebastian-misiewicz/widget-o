widgeto.service('WidgetManager', function($sce, $templateRequest) {
    
    var widgets = [];
    
    var scopes = [];
    
    this.addScope = function(id, scope) {
        scopes[id] = scope;
    };
    
    this.getScope = function(id) {
        return scopes[id];
    };
    
    
    this.add = function(name) {
        var templateUrl = $sce.getTrustedResourceUrl('widgets/' +  name + ".html");
        
        $templateRequest(templateUrl).then(function(template) {
            console.log("Loaded widget: " + name);
            widgets.push({
                "name": name,
                "template": template
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
    }
    
});

