# Widget-o

## Installation
Add following lines to your template:
1. CSS
   ```html
   <link href="bower_components/widget-o/css/widgeto.css" rel="stylesheet">
   ```
2. JavaScript
   ```html
   <!-- Logging -->
    <script src="bower_components/widget-o/dist/login.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    
    <!-- widget-o:no-render -->
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-resource.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.16/angular-sanitize.js"></script>
    <script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
    <script src="bower_components/angular-ui-sortable/sortable.js"></script>
    <script src="//blueimp.github.io/JavaScript-Load-Image/js/load-image.all.min.js"></script>
    <script src="//blueimp.github.io/JavaScript-Canvas-to-Blob/js/canvas-to-blob.min.js"></script>
    <script src="bower_components/angular-translate/angular-translate.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-process.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-image.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-video.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js"></script>
    
    <script src="bower_components/widget-o/dist/app.js"></script>
    ```
    And the script to set the id of the current page:
    ```html
    <script>
        widgeto.run(function (PageCache) {
            PageCache.setIdPage("{idpage}");
        });
    </script>
    ```
    
## Adding a widget
1. Prepare a controller:

   ```JavaScript
   widgeto.controller('TopMenuController', function ($scope, WidgetManager) {
    $scope.id;
    $scope.element;
    $scope.set = function (id) {
        $scope.id = id;
        $scope.element = WidgetManager.getScope(id);
        return true;
    };
   });
   ```
2. Register the widget in the WidgetManager. Remember to add the:
   * ID - identifies the widget,
   * path to the template
   * sample JSON data for the template.
   ```JavaScript
   widgeto.run(function (WidgetManager) {
    WidgetManager.add(
            'top-menu', 
            'widgets/top-menu.html',
            {
                "widget": "top-menu",
                "label": {
                    "text": "Menu Item"
                },
                "link": {
                    "type": "external",
                    "href": "http://www.wp.pl/"
                }
            });
   });
   ```
3. Add a template at specified location during registration phase (above):

   ```html
   <li id="{{id}}" 
    class="page-scroll widget-o-editable"
    ng-controller="TopMenuController" 
    ng-init="set('[[ID]]')">
    <a href="{{element.link.href}}">{{element.label.text}}</a>
   </li>
   ```
