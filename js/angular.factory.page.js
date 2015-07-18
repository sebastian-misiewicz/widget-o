widgeto.factory("Page", function ($resource) {
    return $resource("rest/page/:id", null,
            {
                'update': {method: 'PUT'}
            });
});