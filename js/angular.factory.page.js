widgeto.factory("Page", function ($resource) {
    return $resource("rest/:id", null,
            {
                'update': {method: 'PUT'}
            });
});