function edit(){var scope=angular.element($("#"+current)).scope();if(!current)throw new Error("Element id doesn't exist");scope.edit(current)}function manage(){var scope=angular.element($("#"+currentManage)).scope();if(!currentManage)throw new Error("Element id doesn't exist");scope.edit(currentManage)}function translate(text){angular.element(document.body).injector().get("$translate")(text).then(function(data){i18n[text]=data,console.log(i18n)})}widgeto=angular.module("widget-o",["ngResource","ngSanitize","ui.sortable","blueimp.fileupload","pascalprecht.translate","ui.tinymce"]),widgeto.config(function($translateProvider){$translateProvider.translations("en",enTranslations),$translateProvider.translations("pl",plTranslations),$translateProvider.preferredLanguage("pl")}),widgeto.controller("ConfigureWidgetController",function($scope,$rootScope,WidgetManager){$scope.id="",$scope.value="",$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),$scope.widgets=WidgetManager.getAll(),!0},$scope.addSampleJson=function(widgetName){console.log(widgetName);var widget=WidgetManager.getWidget(widgetName);$rootScope.$broadcast("configure-widget",$scope.id,widget.sampleJson)}}),widgeto.run(function(WidgetManager){WidgetManager.add("configure-widget","bower_components/widget-o/html/configure-widget.html")}),widgeto.controller("EditBooleanController",function($scope,WidgetManager){$scope.id="",$scope.value="",$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),!0}}),widgeto.run(function(WidgetManager){WidgetManager.add("edit-boolean","bower_components/widget-o/html/edit-boolean.html",{"boolean":!1})}),widgeto.controller("EditImageController",function($scope,$http,WidgetManager){$scope.id="",$scope.value="",$scope.files=[],$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),$http.get("rest/file/image").then(function(response){$scope.files=response.data.files||[]}),!0}}),widgeto.run(function(WidgetManager){WidgetManager.add("edit-src","bower_components/widget-o/html/edit-image.html",{src:"http://someimage.url.com",alt:"Some image text",width:""})}),widgeto.controller("EditLinkController",function($scope,WidgetManager,Page){$scope.id="",$scope.value="",$scope.hrefs=[],$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),!0},$scope.$watch("value.link.type",function(){switch($scope.hrefs=[],$scope.value.link.type){case"section":var sections=$("section").toArray();for(var section in sections){var id=$(sections[section]).attr("id");$scope.hrefs.push("#"+id)}break;case"internal":Page.query({},function(pages){pages.forEach(function(page){page.idpage&&$scope.hrefs.push(page.idpage)})})}})}),widgeto.run(function(WidgetManager){WidgetManager.add("edit-link","bower_components/widget-o/html/edit-link.html",{type:"internal",href:"index.html"})}),widgeto.controller("EditOrderController",function($scope,$rootScope,WidgetManager){$scope.id="",$scope.value="",$scope.widgets=WidgetManager.getAll(),$scope.sample={id:"",widgetName:""},$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),!0},$scope.sortableOptions={axis:"y"},$scope.reRender=function(){$rootScope.$broadcast("rerender-widgets",$scope.id)},$scope.remove=function(element){var index=$scope.value.elements.indexOf(element);index>-1&&$scope.value.elements.splice(index,1)},$scope.add=function(){var widget=WidgetManager.getWidget($scope.sample.widgetName);if(widget&&widget.sampleJson){var element=JSON.parse(JSON.stringify(widget.sampleJson));element.id=$scope.id+"-"+$scope.sample.id,$scope.value.elements.push(element)}}}),widgeto.run(function(WidgetManager){WidgetManager.add("edit-elements","bower_components/widget-o/html/edit-order.html")}),widgeto.controller("EditTextController",function($scope,WidgetManager){$scope.id="",$scope.value="",$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),!0}}),widgeto.run(function(WidgetManager){WidgetManager.add("edit-text","bower_components/widget-o/html/edit-text.html",{text:"Some text"})}),widgeto.controller("EditTextareaController",function($scope,WidgetManager){$scope.id="",$scope.value="",$scope.set=function(id){return console.log("Setting widget id to: "+id),$scope.id=id,$scope.value=WidgetManager.getScope(id),!0},$scope.tinymceOptions={inline:!1,plugins:"link image table",tools:"inserttable"},$(document).on("focusin",function(e){$(e.target).closest(".mce-window").length&&e.stopImmediatePropagation()})}),widgeto.run(function(WidgetManager){WidgetManager.add("edit-textarea","bower_components/widget-o/html/edit-textarea.html",{textarea:"This is a sample text"})}),widgeto.controller("MainController",function($scope,$rootScope,$compile,$http,TemplateManager,WidgetManager,PageCache,Page){function getElement(id){if(console.log("Getting an element with ID "+id),$scope.page[id])return console.log("Found parent element for edit: "+id),$scope.page[id];for(var parent in $scope.page){var elements=$scope.page[parent].elements;if(elements)for(var i in elements)if(elements[i].id===id)return console.log("Found child element for edit: "+id),elements[i]}}function refreshCurrentPage(){window.location=$scope.idpage}$http.defaults.headers.common["auth-token"]=Cookies.get("auth-token"),$.ajaxSetup({headers:{"auth-token":Cookies.get("auth-token")}}),TemplateManager.loadAll(),$scope.idpage=PageCache.getIdPage(),$scope.edit=function(id,type){$rootScope.$broadcast("modal-open",id,getElement(id)),$("#modal-edit").modal("show")},$scope.startEdit=function(){console.log("Starting the edit mode"),$rootScope.$broadcast("start-edit")},$rootScope.$on("edit-meta",function(){$scope.edit("meta")}),$rootScope.$on("configure-widget",function(event,id,value){$scope.page[id]=value,$("#modal-edit").modal("hide")}),$rootScope.$on("login-success",function(){inEdit=!0}),$rootScope.$on("logout",function(){Cookies.remove("auth-token"),$http.post("rest/logout/").then(refreshCurrentPage,refreshCurrentPage)}),$rootScope.$on("page-save",function(){Page.update({id:$scope.idpage},{html:$("html").html(),data:$scope.page},function(){$rootScope.$broadcast("modal-alert-popup","success","Page saved","Page "+$scope.idpage+" saved succesfully.")},function(e){$rootScope.$broadcast("modal-alert-open","danger","Save failed",e.status)})}),$rootScope.$on("page-reset",function(){Page.get({id:$scope.idpage},function(page){$scope.page=page},function(){$rootScope.$broadcast("modal-alert-open","danger","Page get failed","Failed to get the page: "+$scope.idpage)})}),$rootScope.$on("templates-loaded",function(event,id){Page.get({id:$scope.idpage},function(page){$scope.page||($scope.page=page)},function(){$rootScope.$broadcast("modal-alert-open","danger","Templates load fail","Failed to get the page "+$scope.idpage)}),console.log("Compiling "+id),$compile($(id).contents())($scope),console.log("Compiled "+id),$rootScope.$broadcast("compiled",id)}),$scope.widgets=[],$rootScope.$on("rerender-widgets",function(event,id){console.log("Caught rerender-widgets of id: "+id),$scope.renderWidgets(id,!0)}),$scope.renderWidgets=function(parent,force){if(!$scope.page)return!1;if($scope.page[parent]||($scope.page[parent]={elements:[]}),$scope.widgets[parent]&&!force)return!0;var elements=$scope.page[parent].elements;$scope.widgets[parent]=!0,console.log($("#"+parent)),$("#"+parent).html(""),console.log("Appending widgets for parent "+parent);for(var index in elements){var element=elements[index];console.log("Appending widget "+element.id),WidgetManager.addScope(element.id,element),$("#"+parent).append(WidgetManager.get(element.widget).replace("[[ID]]",element.id))}return $compile($("#"+parent).contents())($scope),!1},$scope.$watch("widgets",function(){console.log("Widgets CHANGED")})});var current,currentManage,inEdit=!1,i18n=[];angular.element(document).ready(function(){translate("EDIT"),translate("MANAGE"),inEdit=!0}),$("body").on("mouseenter",".widget-o-editable",function(e){inEdit&&($(this).popover({content:'<button type="button" style="z-index: 999" class="btn btn-default" onclick="edit()"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> '+i18n.EDIT+"</button>",trigger:"manual",html:!0,template:'<div class="popover" style="z-index: 999" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'}),$(".modal-dialog").draggable({handle:".modal-header"}),current=e.currentTarget.id,$(this).popover("show"))}),$("body").on("mouseleave",".widget-o-editable",function(){if(inEdit){var ref=$(this);timeoutObj=setTimeout(function(){ref.popover("hide")},50)}}),$("body").on("mouseenter",".widget-o-managable",function(e){inEdit&&($(this).popover({content:'<button type="button" style="z-index: 999" class="btn btn-default" onclick="manage()"><span class="glyphicon glyphicon-edit" aria-hidden="true"></span> '+i18n.MANAGE+"</button>",trigger:"manual",html:!0,placement:"bottom",template:'<div class="popover" style="z-index: 999" onmouseover="clearTimeout(timeoutObj);$(this).mouseleave(function() {$(this).hide();});"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'}),currentManage=e.currentTarget.id,$(this).popover("show"))}),$("body").on("mouseleave",".widget-o-managable",function(){if(inEdit){var ref=$(this);timeoutObj=setTimeout(function(){ref.popover("hide")},50)}}),widgeto.controller("ModalAlertController",function($scope,$rootScope){function setScope(type,title,message){switch($scope.type=type,$scope.title=title,console.log(message),message){case 403:$scope.message="403 - Forbidden - Log in first.";break;case 404:$scope.message="403 - Page Not Found.";break;default:$scope.message=message}}$rootScope.$on("modal-alert-open",function(event,type,title,message){setScope(type,title,message),$("#modal-alert").modal("show")}),$rootScope.$on("modal-alert-popup",function(event,type,title,message){setScope(type,title,message),$("#modal-alert").modal("show"),setTimeout(function(){$("#modal-alert").modal("hide")},1500)})}),widgeto.run(function(TemplateManager){TemplateManager.add("#modal-alert","bower_components/widget-o/html/modal-alert.html","body")}),widgeto.controller("ModalEditController",function($scope,$rootScope,$compile,WidgetManager){function render(){var value=$scope.value,modalBody=$("#modal-edit-body");if(modalBody.html(""),value)for(var i in value){var element=value[i];if(appendEditWidget(modalBody,$scope.id,i,value),null!==element&&"object"==typeof element)for(var item in element)appendEditWidget(modalBody,i,item,element)}else appendWidget(modalBody,$scope.id,"configure-widget",value);$compile(modalBody.contents())($scope)}function appendEditWidget(modalBody,id,editType,elementToEdit){appendWidget(modalBody,id,"edit-"+editType,elementToEdit)}function appendWidget(modalBody,id,widget,elementToEdit){var template=WidgetManager.get(widget);template&&(WidgetManager.addScope(id,elementToEdit),modalBody.append(template.replace("[[ID]]",id)))}$scope.id="",$scope.value=null,$rootScope.$on("modal-open",function(event,id,value){console.log("modal-edit-opened"),$scope.safeApply(function(){$scope.id=id,$scope.value=value,render()})}),$scope.safeApply=function(fn){var phase=this.$root.$$phase;"$apply"==phase||"$digest"==phase?fn&&"function"==typeof fn&&fn():this.$apply(fn)}}),widgeto.run(function(TemplateManager){TemplateManager.add("#modal-edit","bower_components/widget-o/html/modal-edit.html","body","#modal-edit-body")}),widgeto.controller("ModalFileManagerController",function($scope,$rootScope,$http){function fileRemovedSuccess(response,file){if(response.data[file.name]){var index=$scope.files.indexOf(file);index>-1&&$scope.files.splice(index,1)}else fileRemovedFailed(file)}function fileRemovedFailed(file){file.error="Error"}$scope.value={idsite:"",template:""},$scope.files=[],$rootScope.$on("modal-file-manager-open",function(){$http.get("rest/file").then(function(response){$scope.files=response.data.files||[]}),$("#modal-file-manager").modal("show")}),$scope["delete"]=function(file){$http["delete"]("rest/file",{params:{"files[]":file.name}}).then(function(response){fileRemovedSuccess(response,file)},function(){fileRemovedFailed(file)})}}),widgeto.run(function(TemplateManager){TemplateManager.add("modal-file-manager","bower_components/widget-o/html/modal-file-manager.html","body")}),widgeto.controller("ModalFileUploadController",function($scope,$rootScope){$scope.value={idsite:"",template:""},$scope.options={url:"rest/file"},$rootScope.$on("modal-file-upload-open",function(){$("#modal-file-upload").modal("show")}),$scope.$watch("queue",function(){console.log($scope)})}),widgeto.run(function(TemplateManager){TemplateManager.add("modal-file-upload","bower_components/widget-o/html/modal-file-upload.html","body")}),widgeto.controller("ModalPageManagerController",function($scope,$rootScope,Template,Page){$scope.saveFailed=!1,$scope.saveSucceeded=!1,$scope.value={idpage:"",template:""},$rootScope.$on("modal-page-manager-open",function(){$scope.templates=Template.query(),$scope.pages=Page.query(),$("#modal-page-manager").modal("show")}),$scope.save=function(){Page.save($scope.value,function(){$scope.saveFailed=!1,$scope.saveSucceeded=!0,$scope.pages=Page.query()},function(){$scope.saveSucceeded=!1,$scope.saveFailed=!0})},$scope.deletePage=function(page){var idpage=page.idpage;Page["delete"]({id:page.idpage},function(){$rootScope.$broadcast("modal-alert-open","success","Deleted page "+idpage),$scope.pages=Page.query()},function(e){$rootScope.$broadcast("modal-alert-open","danger","Page delete failed",e.status)})}}),widgeto.run(function(TemplateManager){TemplateManager.add("modal-add-new-page","bower_components/widget-o/html/modal-page-manager.html","body")}),widgeto.controller("ToolboxController",function($scope,$rootScope){$scope.isVisible=!1,$scope.show=function(){$scope.isVisible=!0},$scope.hide=function(){$scope.isVisible=!1},$scope.save=function(){$rootScope.$broadcast("page-save")},$scope.render=function(){$rootScope.$broadcast("page-render")},$scope.reset=function(){$rootScope.$broadcast("page-reset")},$scope.logout=function(){$rootScope.$broadcast("logout")},$scope.fileUpload=function(){$rootScope.$broadcast("modal-file-upload-open")},$scope.fileManager=function(){$rootScope.$broadcast("modal-file-manager-open")},$scope.pageManager=function(){$rootScope.$broadcast("modal-page-manager-open")},$scope.editMeta=function(){$rootScope.$broadcast("edit-meta")};var toggleModeOn=!1;$scope.toggleWidgets=function(){toggleModeOn=!toggleModeOn,$(".widget-o-editable, .widget-o-managable").each(function(){toggleModeOn?($(this).addClass("widget-o-toggle"),"img"===this.nodeName.toLowerCase()&&""===this.src&&(this.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==")):$(this).removeClass("widget-o-toggle")})}}),widgeto.run(function(TemplateManager){TemplateManager.add("toolbox","bower_components/widget-o/html/toolbox.html","body")}),widgeto.factory("Page",function($resource){return $resource("rest/page/:id",null,{update:{method:"PUT"}})}),widgeto.factory("Render",function($resource){return $resource("rest/render/:id",null,{update:{method:"PUT"}})}),widgeto.factory("Template",function($resource){return $resource("rest/template/:id")});var enTranslations={CURRENT_PAGE:"Current page",SAVE:"Save",TOGGLE_WIDGETS:"Toggle widgets",REVERT_CHANGES:"Revert changes",FILES:"Files",UPLOAD:"Upload",MANAGER:"Manager",PAGES:"Pages",ADD_NEW:"Add new",LOGOUT:"Logout",DELETE:"Delete",IMAGE:"Image",WIDTH:"Width",SOURCE:"Source",EDITING:"Editing",ADD:"Add",APPLY_CHANGES:"Apply changes",ORDER_OF:"Order of",ENTER_UNIQUE_ID:"Enter an id (unique)",CLOSE:"Close",TEXTAREA:"Textarea",BOLD:"Bold",ITALIC:"Italic",PARAGRAPH:"Paragraph",TEXT:"Text",END:"End",EDIT:"Edit",MANAGE:"Manage",ADD_NEW_PAGE:"Add new page",PAGE_MANAGER:"Page manager",PAGE:"Page",TEMPLATE:"Template",SAVE_FAILED:"Save has failed",SAVE_SUCCEDED:"Save succeded",TRY_AGAIN:"Try again",GO_TO_NEW_PAGE:"Go to new page",LINK:"Link",UNORDERED_LIST:"Unordered list",ORDERED_LIST:"Ordered list",LIST_ITEM:"List item",PARAMETERS:"Parameters",ALT:"Alternate text",PICK_A_TYPE_OF_WIDGET:"Pick a type of widget",FILE:{UPLOAD:"File upload",ADD:"Add files...",UPLOAD_START:"Start upload",UPLOAD_CANCEL:"Cancel upload",MANAGER:"File manager",NO_FILES:"No files"},"edit-boolean":"Boolean","edit-src":"Image","edit-link":"Link","edit-text":"Text","edit-textarea":"Text area"},plTranslations={CURRENT_PAGE:"Obecna strona",SAVE:"Zapisz",TOGGLE_WIDGETS:"Pokaż widgety",REVERT_CHANGES:"Cofnij zmiany",FILES:"Pliki",UPLOAD:"Wczytaj",MANAGER:"Manager",PAGES:"Strony",ADD_NEW:"Dodaj nową",LOGOUT:"Wyloguj",DELETE:"Skasuj",IMAGE:"Obraz",WIDTH:"Szerokość",SOURCE:"Źródło",EDITING:"Edycja",ADD:"Dodaj",APPLY_CHANGES:"Zatwierdź zmiany",ORDER_OF:"Kolejność",ENTER_UNIQUE_ID:"Wprowadź unikalne ID",CLOSE:"Zamknij",TEXTAREA:"Pole tekstowe",BOLD:"Pogrubienie",ITALIC:"Kursywa",PARAGRAPH:"Paragraf",TEXT:"Tekst",END:"Koniec",EDIT:"Edytuj",MANAGE:"Zarządzaj",ADD_NEW_PAGE:"Dodaj nową stronę",PAGE_MANAGER:"Zarządzaj stronami",PAGE:"Strona",TEMPLATE:"Szablon",SAVE_FAILED:"Zapis nie powiódł się",SAVE_SUCCEDED:"Zapis powiódł się",TRY_AGAIN:"Spróbuj ponownie",GO_TO_NEW_PAGE:"Przejdź do nowej strony",LINK:"Link",UNORDERED_LIST:"Lista punktowa",ORDERED_LIST:"Lista numerowana",LIST_ITEM:"Element listy",PARAMETERS:"Parametry",ALT:"Treść alternatywna",PICK_A_TYPE_OF_WIDGET:"Wybierz rodzaj widgeta",FILE:{UPLOAD:"Wczytytywanie plików",ADD:"Dodaj pliki...",UPLOAD_START:"Zacznij",UPLOAD_CANCEL:"Zaniechaj",MANAGER:"Manager plików",NO_FILES:"Brak plików"},"edit-boolean":"Wartość logiczna","edit-src":"Obraz","edit-link":"Link","edit-text":"Tekst","edit-textarea":"Pole tekstowe"};widgeto.service("PageCache",function(){this.setIdPage=function(idpage){this.idpage=idpage},this.getIdPage=function(){return this.idpage},this.setPage=function(page){this.page=page},this.getPage=function(){return this.page}}),widgeto.service("TemplateManager",function($rootScope,$sce,$templateRequest,$compile){var templates={id:"body",append:"body",elements:[]},count=[],templateManager=this;this.add=function(id,templateFilePath,position,append){"body"===position?templates.elements.push({id:id,path:templateFilePath,append:append,elements:[]}):templates.elements.forEach(function(element){element.id===position&&element.elements.push({id:id,append:append,path:templateFilePath})})},this.loadAll=function(){this.loadLevel(templates)},this.loadLevel=function(element){count[element.id]=element.elements?element.elements.length:0,console.log("Loading level "+element.id+" of elements "+count[element.id]),element.elements&&element.elements.forEach(function(template){templateManager.load(element,template.path)})},this.load=function(element,templateFilePath){var templateUrl=$sce.getTrustedResourceUrl(templateFilePath);$templateRequest(templateUrl).then(function(template){if(console.log("Adding template "+templateFilePath+" at position: "+element.append),console.log(element.append),$(element.append).append(template),count[element.id]--,console.log(count[element.id]),0===count[element.id]){if($rootScope.$broadcast("templates-loaded",element.id),!element.elements)return;element.elements.forEach(function(template){templateManager.loadLevel(template)})}},function(){$rootScope.$broadcast("modal-alert-open","danger","Loading a template failed","Failed to load: "+templateUrl)})}}),widgeto.service("WidgetManager",function($sce,$templateRequest){var widgets=[],scopes=[];this.addScope=function(id,scope){scopes[id]=scope},this.getScope=function(id){return scopes[id]},this.add=function(name,templatePath,sampleJson){var templateUrl=$sce.getTrustedResourceUrl(templatePath);$templateRequest(templateUrl).then(function(template){console.log("Loaded widget: "+name),widgets.push({name:name,template:template,sampleJson:sampleJson})},function(){console.log("Failed to load widget: "+name)})},this.get=function(name){for(var index in widgets)if(widgets[index].name===name)return widgets[index].template;return""},this.getWidget=function(name){for(var index in widgets)if(widgets[index].name===name)return widgets[index];return""},this.getAll=function(){var widgetNames=[];for(var index in widgets){var widget=widgets[index];widget.sampleJson&&widgetNames.push(widgets[index].name)}return widgetNames}});