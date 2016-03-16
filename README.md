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
    <script src="bower_components/widget-o/dist/vendor.js"></script>
    <script src="bower_components/widget-o/dist/app.js"></script>
    
    </body>
    ```
    And the script to set the id of the current page. Add it just before the `</body>`:
    ```html
    <script>
        widgeto.run(function (PageCache) {
            PageCache.setIdPage("{idpage}");
        });
    </script>
    
    </body>
    ```

## Guards
While you edit the HTML of a page itself changes. JavaScript and CSS might be added to the original template. To prevent it from beeing rendered `guard`s are used. Add a guard before all important tags to remove all additional code added next to them. For instance:

```html
<!-- widget-o:guard:<head>; -->
<head>
```

or

```html
<!-- widget-o:guard:</head>; -->
</head>
```

Syntax for `guard` starting point: `<!-- widget-o:guard:<TAG>; -->`. Such guard will clear all additional code between the guard and the `<TAG>`.

In the first section one guard is already present. It guards the `</body>` tag. This time the guard starting point is set before all scripts import needed to edit the page since they are not needed after page rendering.

## Widgets
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

Popover can be placed in all four sides of a widget. Use following CSS classes to change the default placement: `widget-o-placement-top`, `widget-o-placement-right`, `widget-o-placement-bottom` or `widget-o-placement-left`.

For example:

```html
<li id="{{id}}" 
    class="widget-o-editable widget-o-placement-top"
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

### Adding a widget
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
   
### Render nested elements
Nested elements within one widget require a separate configuration.

```html
<section id="{{id}}"
         class="widget-o-editable widget-o-placement-top"
         ng-controller="WidgetController"
         ng-init="set('[[ID]]')">
      <div class="row">
         <div class="col-lg-6">
            <h2>{{element.heading.text}}</h2>
         </div>
         <div class="col-lg-6">
            <div ng-show="renderWidgets('[[ID]]-buttons')"></div>
            <ul id="[[ID]]-buttons" class="widget-o-managable widget-o-placement-top list-inline banner-social-buttons">
            </ul>
         </div>
      </div>
</section>
```

In the example above there is a nested '[[ID]]-buttons' block. To configure it properly - for widget'o to pick it up - there is need to add a following configuration in widget:

```js
"toRender": [
     "-buttons"
],
```

Which results in:

```js
WidgetManager.add(
   'contact-section', 
   'templates/startbootstrap-landing-page/widgets/contact-section.html',
   {
      "widget": "contact-section",
      "toRender": [
         "-buttons"
      ],
      "heading": {
         "text": "Contact"
      }
   });
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
   enTranslations["star-title"] = "Title with a star";
```

## Other

For technical information visit: [TECHNICAL.md](TECHNICAL.md)
