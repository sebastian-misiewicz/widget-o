# Widget-o - Technical informations

## Building a distribution package
Run
```bash
grunt package
```

## Set of scripts instead of single app.js

Use following set of `js` files instead of app.js for debugging:

```html
    <script src="bower_components/widget-o/js/angular.config.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.configureWidget.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editBoolean.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editText.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editTextarea.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editLink.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editImage.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editOrder.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.editMeta.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.main.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalAlert.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalEdit.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalFileManager.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalFileUpload.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalPageManager.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.modalSettings.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.toolbox.js"></script>
    <script src="bower_components/widget-o/js/angular.controller.widget.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.asyncTranslationsLoader.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.page.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.render.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.template.js"></script>
    <script src="bower_components/widget-o/js/angular.factory.user.js"></script>
    <script src="bower_components/widget-o/js/angular.i18n.pl-pl.js"></script>
    <script src="bower_components/widget-o/js/angular.i18n.en-gb.js"></script>
    <script src="bower_components/widget-o/js/angular.service.pageCache.js"></script>
    <script src="bower_components/widget-o/js/angular.service.widgetManager.js"></script>
    <script src="bower_components/widget-o/js/angular.service.templateManager.js"></script>
```
## Set of scripts instead of single vendor.js

Use following set of `js` files instead of vendor.js for debugging:

```html
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
```
