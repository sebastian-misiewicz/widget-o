# Widget-o - Technical informations

## Building a distribution package
Run
```bash
grunt package
```

## Set of scripts instead of single app.js

Use following set of `js` files instead of app.js for debugging:

```html
    <script src="bower_components/widget-o/js/angular.i18n.pl-pl.js"></script>
    <script src="bower_components/widget-o/js/angular.i18n.en-gb.js"></script>
    <script src="bower_components/widget-o/js/angular.config.js"></script>
    <script src="bower_components/widget-o/js/angular.service.templateManager.js"></script>
    <script src="bower_components/widget-o/js/angular.service.widgetManager.js"></script>
    <script src="bower_components/widget-o/js/angular.service.pageCache.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.page.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.render.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.template.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalPageManager.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalFileUpload.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalFileManager.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalEdit.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalAlert.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editBoolean.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editText.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editTextarea.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editLink.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editImage.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editOrder.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.main.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.toolbox.js"></script>
```
