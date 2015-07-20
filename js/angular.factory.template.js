widgeto.factory("Template", function ($resource) {
    return $resource("rest/template/:id");
});