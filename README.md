# Widget-o

## Installation
Add following lines to your template:

1. Add ng-app and ng-controller to the body:

   ```html
   <body ng-app="widget-o" ng-controller="MainController">
   ```
   
   or to html (if meta tag values will be edited as well):
   ```html
   <html ng-app="widget-o" ng-controller="MainController">
   ```

1. CSS

   ```html
   <link href="bower_components/widget-o/css/widgeto.css" rel="stylesheet">
   ```
1. JavaScript

   ```html
    <!-- Log in scripts -->
    <script src="bower_components/widget-o/dist/login.js"></script>
    <script src="bower_components/js-cookie/src/js.cookie.js"></script>
    
    <!-- widget-o:guard:</body>; -->
    <script src="bower_components/tinymce-dist/tinymce.min.js"></script>
    <script src="bower_components/ivan-chkv.tinymce-i18n/langs/pl.js"></script>
    <script src="bower_components/angular/angular.min.js"></script>
    <script src="bower_components/angular-resource/angular-resource.min.js"></script>
    <script src="bower_components/angular-sanitize/angular-sanitize.js"></script>
    <script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
    <script src="bower_components/angular-ui-sortable/sortable.js"></script>
    <script src="bower_components/angular-ui-tinymce/src/tinymce.js"></script>
    <script src="bower_components/angular-translate/angular-translate.js"></script>
    <script src="bower_components/blueimp-load-image/js/load-image.all.min.js"></script>
    <script src="bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.min.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-process.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-image.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-audio.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-video.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-validate.js"></script>
    <script src="bower_components/blueimp-file-upload/js/jquery.fileupload-angular.js"></script>
    
    <script src="bower_components/widget-o/dist/app.js"></script>
    
    </body>
    <!-- widget-o:guard:</body>;end -->
    ```
    And the script to set the id of the current page. Add it just before the `</body>`:
    ```html
    <script>
        widgeto.run(function (PageCache) {
            PageCache.setIdPage("{idpage}");
        });
    </script>
    
    </body>
    <!-- widget-o:guard:</body>; -->
    ```

## Guards
While you edit the HTML of a page itself changes. JavaScript and CSS might be added to the original template. To prevent it from beeing rendered `guard`s are used. Surround important tags with guards to remove all additional code added next to them. For instance:

```html
<!-- widget-o:guard:<head>; -->
<head>
<!-- widget-o:guard:<head>;end -->
```

or

```html
<!-- widget-o:guard:</head>; -->
</head>
<!-- widget-o:guard:</head>;end -->
```

Syntax for `guard` starting point: `<!-- widget-o:guard:<TAG>; -->` and for end point: `<!-- widget-o:guard:<TAG>;end -->`.

In the first section one guard is already present. It guards the `</body>` tag. This time the guard starting point is set before all scripts import needed to edit the page since they are not needed after page rendering.

## Widget elements
CSS classes `widget-o-editable` and `widget-o-managable` are used to start editing mode of a certain widget-o element.

Code below will allow to start edit mode for the `introText`. It is important to put the id with a proper element name. Widget-o in edit mode reads the id and finds the contents associated with the given ID within page JSON.

```html
<span class="name widget-o-editable widget-o-widget-text" id="introText">{{page.introText.text}}</span>
```

Managing multiple widgets is done with the use of `widget-o-managable`. Typical setup looks like:

```html
<div class="row widget-o-managable" id="section">
 <div ng-show="renderWidgets('section')"></div>
</div>
```

Note the `renderWidgets('section')`, which matches the `id` of parent `div`.

### Placement of edit or manage popover

Popover can be placed in all four sides of a widget. Use following CSS classes to change the default placement: `widget-o-position-top`, `widget-o-position-right`, `widget-o-position-bottom` or `widget-o-position-left`.

For example:

```html
<li id="{{id}}" 
    class="widget-o-editable widget-o-position-top"
    ng-controller="TopMenuController" 
    ng-init="set('[[ID]]')">
    <a href="{{element.link.href}}">{{element.label.text}}</a>
</li>
```

### Boolean
##### JSON

```json
   "field": {
      "boolean": false
   }
```

##### HTML

```html
<div ng-show="element.field.boolean"></div>
```

### Text
##### JSON

```json
   "field": {
      "text": "Some text"
   }
```

##### HTML

```html
<div>{{element.field.text}}</div>
```

### Link
Link supports following types:

| Type | Description | Example value (href) |
| --- | --- | --- |
| internal | link within a single widget-o application | index.html |
| external | external link | https://github.com/sebastian-misiewicz/widget-o |
| section | section withon one page | #section |

##### JSON

```json
   "field": {
      "type": "internal",
      "href": "index.html"
   }
```

##### HTML

```html
<div>{{element.field.text}}</div>
```

### Textarea

Textarea is basically a field with HTML code.

##### JSON

```json
   "field": {
      "textarea": ""
   }
```

##### HTML

```html
<p ng-bind-html="element.field.textarea"></p>
```

### Image

##### JSON

```json
   "field": {
      "src": "img/profile.png",
      "alt": "Alternate text",
      "width": 100
   }
```

##### HTML

```html
<img src="{{page.introImage.src}}" alt="{{page.introImage.alt}}" width="{{page.introImage.width}}" class="widget-o-editable" id="introImage">
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

## Panels

Each widget can be a panel. It means, that it can be shared with other pages. If a panel is edited on one page it can be reused on other page. The `ID` of a widget has to be the same.

For instance:

```json
"topMenuImage": {
   "src":"box.png",
   "alt":"Some image text",
   "width":"40",
   "isPanel":true,
   "isEdit":false
}
```

Flag `isPanel` indicates, that an element is a panel. `isEdit` if set to `true` informs, that by next panel save the panel data should be updated. Otherwise the panel data is not touched.

## Translations
Widget names can be translated. There are two global variables with translations available: `plTranslations` and `enTranslations`. Add widget name to get it localized:

```javascript
   plTranslations["star-title"] = "Tytuł z gwiazdką";
   enTranslations["star-title"] = "Title with a start";
```

## Other

For technical information visit: [TECHNICAL.md](TECHNICAL.md)
