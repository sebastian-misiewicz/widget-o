widgeto = angular.module('widget-o', ['ngResource', 'ngSanitize', 'ui.sortable', 'blueimp.fileupload', 'pascalprecht.translate', 'ui.tinymce']);

widgeto.config(function ($translateProvider) {
  $translateProvider.useLoader('asyncTranslationsLoader');
  $translateProvider.preferredLanguage('pl');
});