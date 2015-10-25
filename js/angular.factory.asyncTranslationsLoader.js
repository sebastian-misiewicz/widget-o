widgeto.factory('asyncTranslationsLoader', function ($q, $timeout) {

    return function (options) {
        var deferred = $q.defer(),
                translations;

        if (options.key === 'pl') {
            translations = plTranslations;
        } else {
            translations = enTranslations;
        }

        $timeout(function () {
            deferred.resolve(translations);
        }, 1000);

        return deferred.promise;
    };
});