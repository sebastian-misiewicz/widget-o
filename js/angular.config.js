widgeto = angular.module('widget-o', ['ngResource', 'ngSanitize', 'ui.sortable', 'blueimp.fileupload', 'pascalprecht.translate']);

widgeto.config(function ($translateProvider) {
  $translateProvider.translations('en', {
    CURRENT_PAGE: 'Current page',
    SAVE: 'Save',
    TOGGLE_WIDGETS: 'Toggle widgets',
    REVERT_CHANGES: 'Revert changes',
    FILES: 'Files',
    UPLOAD: 'Upload',
    MANAGER: 'Manager',
    PAGES: 'Pages',
    ADD_NEW: 'Add new',
    LOGOUT: 'Logout'
  });
  $translateProvider.translations('pl', {
    CURRENT_PAGE: 'Obecna strona',
    SAVE: 'Zapisz',
    TOGGLE_WIDGETS: 'Pokaż widgety',
    REVERT_CHANGES: 'Cofnij zmiany',
    FILES: 'Pliki',
    UPLOAD: 'Wczytaj',
    MANAGER: 'Manager',
    PAGES: 'Strony',
    ADD_NEW: 'Dodaj nową',
    LOGOUT: 'Wyloguj'
  });
  $translateProvider.preferredLanguage('pl');
});