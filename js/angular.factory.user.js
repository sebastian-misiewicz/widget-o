widgeto.factory("User", function ($resource) {
    return $resource("rest/user/:username", null,
            {
                'update': {method: 'PUT'}
            });
});