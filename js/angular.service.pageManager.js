widgeto.service('PageManager', function() {
    
    var page;
    
    this.set = function(page) {
        this.page = page;
    };
    
    this.get = function() {
        return this.page;
    };
    
});

