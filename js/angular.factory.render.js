widgeto.factory("Render", function ($resource) {
    return $resource("rest/render/:id", null,
            {
                'update': {method: 'PUT'}
            });
});