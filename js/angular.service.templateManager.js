widgeto.service('TemplateManager', function($rootScope, $sce, $templateRequest, $compile) {
    
    var templates = {
        "id": "body",
        "append": "body",
        "elements": []
    };
    
    var count = [];
    var templateManager = this;
    
    // TODO sebastian Add full traversal (now only one level is supported)
    // TODO sebastian improve the code (remove duplication)
    this.add = function(id, templateFilePath, position, append) {
        if (position === 'body') {
            templates.elements.push({
                "id": id,
                "path": templateFilePath,
                "append": append,
                "elements": []
            });
        } else { 
            templates.elements.forEach(function (element) {
                if (element.id === position) {
                    element.elements.push({
                        "id": id,
                        "append": append,
                        "path": templateFilePath
                    });
                }
            });
        }
    };
    
    this.loadAll = function() {
        this.loadLevel(templates);
    };
    
    this.loadLevel = function(element) {
        count[element.id] = (element.elements) ? element.elements.length : 0;
        console.log("Loading level " + element.id + " of elements "+ count[element.id]);
        if (!element.elements) {
            return;
        }
        
        element.elements.forEach(function (template) {
           templateManager.load(element, template.path); 
        });

    };
    
    this.load = function (element, templateFilePath) {
        var templateUrl = $sce.getTrustedResourceUrl(templateFilePath);
    
        $templateRequest(templateUrl).then(function(template) {
            console.log("Adding template " + templateFilePath + " at position: " + element.append);
            console.log(element.append);
            $(element.append).append(template);
            count[element.id]--;
            console.log(count[element.id]);
            if (count[element.id] === 0) {
                $rootScope.$broadcast('templates-loaded', element.id);
                
                if (!element.elements) {
                    return;
                }

                element.elements.forEach(function (template) {
                    templateManager.loadLevel(template); 
                });
            }
        }, function() {
            $rootScope.$broadcast('modal-alert-open', 'danger', 'Loading a template failed', 'Failed to load: ' + templateUrl);
        });
    };
    
});

