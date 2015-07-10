widgeto.service('PageCache', function() {
    
    var idpage;
    var page;
    
    this.setIdPage = function(idpage) {
        this.idpage = idpage;
    };
    
    this.getIdPage = function() {
        return this.idpage;
    };
    
    this.setPage = function(page) {
        this.page = page;
    };
    
    this.getPage = function() {
        return this.page;
    };
    
});

