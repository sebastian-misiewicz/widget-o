widgeto = angular.module('widget-o', ['ngResource', 'ngSanitize', 'ui.sortable', 'blueimp.fileupload', 'pascalprecht.translate']);

widgeto.config(function ($translateProvider) {
  $translateProvider.translations('en', enTranslations);
  $translateProvider.translations('pl', plTranslations);
  $translateProvider.preferredLanguage('pl');
});