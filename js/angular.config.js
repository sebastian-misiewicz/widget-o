widgeto = angular.module('widget-o', ['ngResource', 'ngSanitize', 'ui.sortable', 'blueimp.fileupload', 'pascalprecht.translate', 'ui.tinymce', 'angular-md5']);

widgeto.config(function ($translateProvider) {
  $translateProvider.useLoader('asyncTranslationsLoader');
  $translateProvider.determinePreferredLanguage()
    .fallbackLanguage('en');
});
