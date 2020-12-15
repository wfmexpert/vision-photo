!function(t,o){"object"==typeof exports&&"object"==typeof module?module.exports=o():"function"==typeof define&&define.amd?define([],o):"object"==typeof exports?exports.VisionPhotoGallery=o():t.VisionPhotoGallery=o()}(this,(function(){return function(){"use strict";var t={946:function(t,o,e){function n(t,o){for(var e=0;e<o.length;e++){var n=o[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function r(t,o,e){return o in t?Object.defineProperty(t,o,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[o]=e,t}e.d(o,{default:function(){return i}});var i=function(){function t(o){var e=o.root,n=o.personId,r=o.token;if(function(t,o){if(!(t instanceof o))throw new TypeError("Cannot call a class as a function")}(this,t),!e)throw new Error("Не указан ID корневого элемента для галереи!");var i=document.getElementById(e);if(!i)throw new Error("Проверьте указанный ID корневого элемента для галереи!");if(this.constructor.rootElement=i,!n)throw new Error("Не указан ID пользователя на портале Vision");this.personId=n,this.token=r,this.constructor.draw()}var o,e,r;return o=t,r=[{key:"request",value:function(t){var o=t.requestPath,e=t.requestBody,n={method:"POST",mode:"same-origin",credentials:"same-origin",headers:{"Content-Type":"application/json","X-CSRFToken":this.token},body:JSON.stringify(e)};return fetch("/api/v2/vision/".concat(o,"/"),n)}},{key:"getPhotos",value:function(){return this.request({requestPath:"get_photos",requestBody:{person_id:this.personId,masterAlbum:!0}})}},{key:"addPhoto",value:function(t){return this.request({requestPath:"add_photo",requestBody:{person_id:this.personId,image:t}})}},{key:"deletePhoto",value:function(t){return this.request({requestPath:"delete_photo",requestBody:{person_id:this.personId,photo_ids:[t],masterAlbum:!0}})}},{key:"updatePhoto",value:function(t){return this.request({requestPath:"delete_photo",requestBody:{person_id:this.personId,photo_id:t,masterAlbum:!0}})}},{key:"draw",value:function(){var t=this,o=this.rootElement;o.innerHTML='\n            <div class="vision-photo-gallery">\n                <input type="file" class="vision-photo-gallery__file-field" tabindex="-1">\n                <div class="vision-photo-gallery__item vision-photo-gallery__item--main">\n                    <h4 class="vision-photo-gallery__title">Основная фотография</h4>\n                    <div class="vg-main-photo"></div>\n                </div>\n                <div class="vision-photo-gallery__item">\n                    <h4 class="vision-photo-gallery__title">Галерея</h4>\n                    <div class="vg-gallery"></div>\n                </div>\n            </div>\n        ';var e=o.querySelector(".vg-main-photo"),n=o.querySelector(".vg-gallery");this.getPhotos().then((function(o){if(e.innerHTML=t.createPhotoElement({main:!0,empty:!0,photoId:null}),n.innerHTML=t.createPhotoElement({main:!1,empty:!0,photoId:null}),t.initEvents(),o.ok)return o.json();e.innerHTML=t.createPhotoElement({main:!0,empty:!0,photoId:null})})).then((function(o){if(o){var r=o.find((function(t){return!0===t.main})),i=o.filter((function(t){return!0!==t.main}));if(r?e.innerHTML=t.createPhotoElement(r):e.parentElement.classList.add("hidden"),i.length){var a="";i.forEach((function(o){return a+=t.createPhotoElement(o)})),n.innerHTML=a}t.initEvents()}})).catch((function(t){console.log(t)}))}},{key:"createPhotoElement",value:function(t){var o=t.photoId,e=t.main,n=t.empty,r=t.path,i=t.avatarUrl,a="",u="",s="",c="";return r&&(s='style="background-image: url('.concat(r,')"')),i&&(s='style="background-image: url('.concat(i,')"')),e&&(c='data-main="'.concat(e,'"')),e&&!n?(u="vg-photo vg-photo--main",a='\n          <button class="vg-photo__button vg-button vg-button--red" data-action="remove-photo">Удалить</button>\n      '):e&&n?(u="vg-photo vg-photo--main",a='\n          <button class="vg-photo__button vg-button" data-action="upload-photo">Загрузить</button>\n      '):!e&&n?(u="vg-gallery__item vg-photo vg-photo--upload",a='\n          <button class="vg-photo__button vg-button vg-button--upload" data-action="upload-photo">&#43;</button>\n      '):(u="vg-gallery__item vg-photo",a='\n          <button class="vg-photo__button vg-button vg-button--green" data-action="choose-photo">Выбрать</button>\n          <button class="vg-photo__button vg-button vg-button--red" data-action="remove-photo">Удалить</button>\n      '),'\n            <div class="'.concat(u,'"\n                ').concat(s,'\n                data-photo-id="').concat(o,'"\n                ').concat(c,">\n                ").concat(a,"\n            </div>\n        ")}},{key:"initEvents",value:function(){var t=this;this.rootElement.querySelectorAll("button").forEach((function(o){o.addEventListener("click",t.router[o.dataset.action],!1)}))}}],(e=[{key:"personId",get:function(){return this.constructor.personId},set:function(t){t&&(this.constructor.personId=t)}},{key:"rootElement",get:function(){return this.constructor.rootElement}},{key:"token",get:function(){return this.constructor.token},set:function(t){t&&(this.constructor.token=t)}}])&&n(o.prototype,e),r&&n(o,r),t}();r(i,"personId",null),r(i,"rootElement",null),r(i,"token",null),r(i,"router",{"upload-photo":function(t){var o=i.rootElement.querySelector('input[type="file"]');o.addEventListener("change",i.router["file-input-changed"]),o.click()},"file-input-changed":function(t){var o=t.target.files[0],e=new FileReader;e.readAsDataURL(o),e.onload=function(){i.addPhoto(e.result).then((function(t){t.ok&&i.draw()})).catch((function(t){console.log(t)}))},e.onerror=function(){throw new Error("Ошибка загрузки фотографии (-ий): ".concat(e.error))}},"remove-photo":function(t){var o=t.target.closest(".vg-photo").dataset.photoId;o&&i.deletePhoto(o).then((function(t){t.ok&&i.draw()}))},"update-photo":function(t){var o=t.target.closest(".vg-photo").dataset.photoId;o&&i.updatePhoto(o).then((function(t){t.ok&&i.draw()})).catch((function(t){console.log(t)}))}})}},o={};function e(n){if(o[n])return o[n].exports;var r=o[n]={exports:{}};return t[n](r,r.exports,e),r.exports}return e.d=function(t,o){for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},e.o=function(t,o){return Object.prototype.hasOwnProperty.call(t,o)},e(946)}().default}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9WaXNpb25QaG90b0dhbGxlcnkvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL1Zpc2lvblBob3RvR2FsbGVyeS8uL1Zpc2lvblBob3RvR2FsbGVyeS9pbmRleC5qcyIsIndlYnBhY2s6Ly9WaXNpb25QaG90b0dhbGxlcnkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vVmlzaW9uUGhvdG9HYWxsZXJ5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9WaXNpb25QaG90b0dhbGxlcnkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL1Zpc2lvblBob3RvR2FsbGVyeS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIl0sIm5hbWVzIjpbInJvb3QiLCJmYWN0b3J5IiwiZXhwb3J0cyIsIm1vZHVsZSIsImRlZmluZSIsImFtZCIsInRoaXMiLCJWaXNpb25QaG90b0dhbGxlcnkiLCJwZXJzb25JZCIsInRva2VuIiwiRXJyb3IiLCJyb290RWxlbWVudCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb25zdHJ1Y3RvciIsImRyYXciLCJyZXF1ZXN0UGF0aCIsInJlcXVlc3RCb2R5IiwicmVxdWVzdERlZmF1bHRzIiwibWV0aG9kIiwibW9kZSIsImNyZWRlbnRpYWxzIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiZmV0Y2giLCJyZXF1ZXN0IiwicGVyc29uX2lkIiwibWFzdGVyQWxidW0iLCJpbWFnZSIsInBob3RvSWQiLCJwaG90b19pZHMiLCJwaG90b19pZCIsImlubmVySFRNTCIsIm1haW5QaG90b0NvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJnYWxsZXJ5IiwiZ2V0UGhvdG9zIiwidGhlbiIsInJlc3BvbnNlIiwiY3JlYXRlUGhvdG9FbGVtZW50IiwibWFpbiIsImVtcHR5IiwiaW5pdEV2ZW50cyIsIm9rIiwianNvbiIsInJlc3BvbnNlSnNvbiIsIm1haW5QaG90b0RhdGEiLCJmaW5kIiwiZ2FsbGVyeVBob3Rvc0RhdGEiLCJmaWx0ZXIiLCJwYXJlbnRFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwibGVuZ3RoIiwiZ2FsbGVyeVBob3Rvc0h0bWwiLCJmb3JFYWNoIiwicGhvdG9EYXRhIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciLCJwYXJhbXMiLCJwYXRoIiwiYXZhdGFyVXJsIiwiYnV0dG9ucyIsImVsZW1lbnRDbGFzc2VzIiwiYmFja2dyb3VuZEltYWdlIiwibWFpbkF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJidXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwicm91dGVyIiwiZGF0YXNldCIsImFjdGlvbiIsImUiLCJmaWxlSW5wdXQiLCJjbGljayIsImZpbGUiLCJ0YXJnZXQiLCJmaWxlcyIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJyZWFkQXNEYXRhVVJMIiwib25sb2FkIiwiYWRkUGhvdG8iLCJyZXN1bHQiLCJvbmVycm9yIiwiY2xvc2VzdCIsImRlbGV0ZVBob3RvIiwidXBkYXRlUGhvdG8iLCJfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18iLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJfX3dlYnBhY2tfbW9kdWxlc19fIiwiZCIsImRlZmluaXRpb24iLCJrZXkiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0Iiwib2JqIiwicHJvcCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCJdLCJtYXBwaW5ncyI6IkNBQUEsU0FBMkNBLEVBQU1DLEdBQzFCLGlCQUFaQyxTQUEwQyxpQkFBWEMsT0FDeENBLE9BQU9ELFFBQVVELElBQ1EsbUJBQVhHLFFBQXlCQSxPQUFPQyxJQUM5Q0QsT0FBTyxHQUFJSCxHQUNlLGlCQUFaQyxRQUNkQSxRQUE0QixtQkFBSUQsSUFFaENELEVBQXlCLG1CQUFJQyxJ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QVVDLGVBQWVDLEtBQUtKLEVBQUtDLElGR3hGWixFQUFvQixLIiwiZmlsZSI6IlZpc2lvblBob3RvR2FsbGVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIlZpc2lvblBob3RvR2FsbGVyeVwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJWaXNpb25QaG90b0dhbGxlcnlcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCAnLi9hcHAuc2Nzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpc2lvblBob3RvR2FsbGVyeSB7XG4gIHN0YXRpYyBwZXJzb25JZCA9IG51bGw7XG4gIHN0YXRpYyByb290RWxlbWVudCA9IG51bGw7XG4gIHN0YXRpYyB0b2tlbiA9IG51bGw7XG5cbiAgY29uc3RydWN0b3Ioe3Jvb3QsIHBlcnNvbklkLCB0b2tlbn0pIHtcbiAgICBpZiAoIXJvb3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcign0J3QtSDRg9C60LDQt9Cw0L0gSUQg0LrQvtGA0L3QtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LTQu9GPINCz0LDQu9C10YDQtdC4IScpO1xuICAgIH1cblxuICAgIGNvbnN0IHJvb3RFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9vdCk7XG5cbiAgICBpZiAoISFyb290RWxlbWVudCkge1xuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5yb290RWxlbWVudCA9IHJvb3RFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ9Cf0YDQvtCy0LXRgNGM0YLQtSDRg9C60LDQt9Cw0L3QvdGL0LkgSUQg0LrQvtGA0L3QtdCy0L7Qs9C+INGN0LvQtdC80LXQvdGC0LAg0LTQu9GPINCz0LDQu9C10YDQtdC4IScpO1xuICAgIH1cblxuICAgIGlmICghcGVyc29uSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcign0J3QtSDRg9C60LDQt9Cw0L0gSUQg0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC90LAg0L/QvtGA0YLQsNC70LUgVmlzaW9uJyk7XG4gICAgfVxuXG4gICAgdGhpcy5wZXJzb25JZCA9IHBlcnNvbklkO1xuICAgIHRoaXMudG9rZW4gPSB0b2tlbjtcblxuICAgIHRoaXMuY29uc3RydWN0b3IuZHJhdygpO1xuICB9XG5cbiAgZ2V0IHBlcnNvbklkKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnBlcnNvbklkO1xuICB9XG5cbiAgc2V0IHBlcnNvbklkKHBlcnNvbklkKSB7XG4gICAgaWYgKHBlcnNvbklkKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLnBlcnNvbklkID0gcGVyc29uSWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0IHJvb3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnJvb3RFbGVtZW50O1xuICB9XG5cbiAgZ2V0IHRva2VuKCkge1xuICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLnRva2VuO1xuICB9XG5cbiAgc2V0IHRva2VuKHRva2VuKSB7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICB0aGlzLmNvbnN0cnVjdG9yLnRva2VuID0gdG9rZW47XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqINCe0LHRkdGA0YLQutCwINC00LvRjyDQt9Cw0L/RgNC+0YHQvtCyINC6IEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHJlcXVlc3RQYXRoIHtzdHJpbmd9INCd0LDQt9Cy0LDQvdC40LUg0LzQtdGC0L7QtNCwIEFQSS5cbiAgICogQHBhcmFtIHJlcXVlc3RCb2R5IHtvYmplY3R9INCf0LDRgNCw0LzQtdGC0YDRiyDQt9Cw0L/RgNC+0YHQsC5cbiAgICogQHJldHVybnMge1Byb21pc2U8UmVzcG9uc2U+fSDQn9GA0L7QvNC40YEg0LfQsNC/0YDQvtGB0LAuXG4gICAqL1xuICBzdGF0aWMgcmVxdWVzdCh7cmVxdWVzdFBhdGgsIHJlcXVlc3RCb2R5fSkge1xuICAgIGNvbnN0IHJlcXVlc3REZWZhdWx0cyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgbW9kZTogJ3NhbWUtb3JpZ2luJyxcbiAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAnWC1DU1JGVG9rZW4nOiB0aGlzLnRva2VuLFxuICAgICAgfSxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3RCb2R5KSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZldGNoKGAvYXBpL3YyL3Zpc2lvbi8ke3JlcXVlc3RQYXRofS9gLCByZXF1ZXN0RGVmYXVsdHMpO1xuICB9XG5cbiAgc3RhdGljIGdldFBob3RvcygpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHtcbiAgICAgIHJlcXVlc3RQYXRoOiAnZ2V0X3Bob3RvcycsXG4gICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICBwZXJzb25faWQ6IHRoaXMucGVyc29uSWQsXG4gICAgICAgIG1hc3RlckFsYnVtOiB0cnVlLFxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGFkZFBob3RvKGltYWdlKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICByZXF1ZXN0UGF0aDogJ2FkZF9waG90bycsXG4gICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICBwZXJzb25faWQ6IHRoaXMucGVyc29uSWQsXG4gICAgICAgIGltYWdlLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBkZWxldGVQaG90byhwaG90b0lkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICByZXF1ZXN0UGF0aDogJ2RlbGV0ZV9waG90bycsXG4gICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICBwZXJzb25faWQ6IHRoaXMucGVyc29uSWQsXG4gICAgICAgIHBob3RvX2lkczogW3Bob3RvSWRdLFxuICAgICAgICBtYXN0ZXJBbGJ1bTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuXG4gIHN0YXRpYyB1cGRhdGVQaG90byhwaG90b0lkKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh7XG4gICAgICByZXF1ZXN0UGF0aDogJ2RlbGV0ZV9waG90bycsXG4gICAgICByZXF1ZXN0Qm9keToge1xuICAgICAgICBwZXJzb25faWQ6IHRoaXMucGVyc29uSWQsXG4gICAgICAgIHBob3RvX2lkOiBwaG90b0lkLFxuICAgICAgICBtYXN0ZXJBbGJ1bTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZHJhdygpIHtcbiAgICBjb25zdCByb290RWxlbWVudCA9IHRoaXMucm9vdEVsZW1lbnQ7XG5cbiAgICByb290RWxlbWVudC5pbm5lckhUTUwgPSBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlzaW9uLXBob3RvLWdhbGxlcnlcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cInZpc2lvbi1waG90by1nYWxsZXJ5X19maWxlLWZpZWxkXCIgdGFiaW5kZXg9XCItMVwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aXNpb24tcGhvdG8tZ2FsbGVyeV9faXRlbSB2aXNpb24tcGhvdG8tZ2FsbGVyeV9faXRlbS0tbWFpblwiPlxuICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3M9XCJ2aXNpb24tcGhvdG8tZ2FsbGVyeV9fdGl0bGVcIj7QntGB0L3QvtCy0L3QsNGPINGE0L7RgtC+0LPRgNCw0YTQuNGPPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZnLW1haW4tcGhvdG9cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlzaW9uLXBob3RvLWdhbGxlcnlfX2l0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzPVwidmlzaW9uLXBob3RvLWdhbGxlcnlfX3RpdGxlXCI+0JPQsNC70LXRgNC10Y88L2g0PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmctZ2FsbGVyeVwiPjwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGA7XG5cbiAgICBjb25zdCBtYWluUGhvdG9Db250YWluZXIgPSByb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmctbWFpbi1waG90bycpO1xuICAgIGNvbnN0IGdhbGxlcnkgPSByb290RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcudmctZ2FsbGVyeScpO1xuXG4gICAgdGhpcy5nZXRQaG90b3MoKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIG1haW5QaG90b0NvbnRhaW5lci5pbm5lckhUTUwgPSB0aGlzLmNyZWF0ZVBob3RvRWxlbWVudCh7XG4gICAgICAgIG1haW46IHRydWUsXG4gICAgICAgIGVtcHR5OiB0cnVlLFxuICAgICAgICBwaG90b0lkOiBudWxsXG4gICAgICB9KTtcblxuICAgICAgZ2FsbGVyeS5pbm5lckhUTUwgPSB0aGlzLmNyZWF0ZVBob3RvRWxlbWVudCh7XG4gICAgICAgIG1haW46IGZhbHNlLFxuICAgICAgICBlbXB0eTogdHJ1ZSxcbiAgICAgICAgcGhvdG9JZDogbnVsbCxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmluaXRFdmVudHMoKTtcblxuICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtYWluUGhvdG9Db250YWluZXIuaW5uZXJIVE1MID0gdGhpcy5jcmVhdGVQaG90b0VsZW1lbnQoe21haW46IHRydWUsIGVtcHR5OiB0cnVlLCBwaG90b0lkOiBudWxsfSk7XG4gICAgICB9XG4gICAgfSkudGhlbihyZXNwb25zZUpzb24gPT4ge1xuICAgICAgaWYgKCFyZXNwb25zZUpzb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtYWluUGhvdG9EYXRhID0gcmVzcG9uc2VKc29uLmZpbmQoKHttYWlufSkgPT4gbWFpbiA9PT0gdHJ1ZSk7XG4gICAgICBjb25zdCBnYWxsZXJ5UGhvdG9zRGF0YSA9IHJlc3BvbnNlSnNvbi5maWx0ZXIoKHttYWlufSkgPT4gbWFpbiAhPT0gdHJ1ZSk7XG5cbiAgICAgIGlmICghIW1haW5QaG90b0RhdGEpIHtcbiAgICAgICAgbWFpblBob3RvQ29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuY3JlYXRlUGhvdG9FbGVtZW50KG1haW5QaG90b0RhdGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFpblBob3RvQ29udGFpbmVyLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChnYWxsZXJ5UGhvdG9zRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGdhbGxlcnlQaG90b3NIdG1sID0gJyc7XG5cbiAgICAgICAgZ2FsbGVyeVBob3Rvc0RhdGEuZm9yRWFjaCgocGhvdG9EYXRhKSA9PiBnYWxsZXJ5UGhvdG9zSHRtbCArPSB0aGlzLmNyZWF0ZVBob3RvRWxlbWVudChwaG90b0RhdGEpKTtcbiAgICAgICAgZ2FsbGVyeS5pbm5lckhUTUwgPSBnYWxsZXJ5UGhvdG9zSHRtbFxuICAgICAgfVxuXG4gICAgICB0aGlzLmluaXRFdmVudHMoKTtcbiAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlUGhvdG9FbGVtZW50KHBhcmFtcykge1xuICAgIGNvbnN0IHtwaG90b0lkLCBtYWluLCBlbXB0eSwgcGF0aCwgYXZhdGFyVXJsfSA9IHBhcmFtcztcbiAgICBsZXQgYnV0dG9ucyA9ICcnO1xuICAgIGxldCBlbGVtZW50Q2xhc3NlcyA9ICcnO1xuICAgIGxldCBiYWNrZ3JvdW5kSW1hZ2UgPSAnJztcbiAgICBsZXQgbWFpbkF0dHJpYnV0ZSA9ICcnO1xuXG4gICAgaWYgKHBhdGgpIHtcbiAgICAgIGJhY2tncm91bmRJbWFnZSA9IGBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgke3BhdGh9KVwiYDtcbiAgICB9XG5cbiAgICBpZiAoYXZhdGFyVXJsKSB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHthdmF0YXJVcmx9KVwiYDtcbiAgICB9XG5cbiAgICBpZiAobWFpbikge1xuICAgICAgbWFpbkF0dHJpYnV0ZSA9IGBkYXRhLW1haW49XCIke21haW59XCJgO1xuICAgIH1cblxuICAgIGlmIChtYWluICYmICFlbXB0eSkge1xuICAgICAgZWxlbWVudENsYXNzZXMgPSAndmctcGhvdG8gdmctcGhvdG8tLW1haW4nO1xuICAgICAgYnV0dG9ucyA9IGBcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidmctcGhvdG9fX2J1dHRvbiB2Zy1idXR0b24gdmctYnV0dG9uLS1yZWRcIiBkYXRhLWFjdGlvbj1cInJlbW92ZS1waG90b1wiPtCj0LTQsNC70LjRgtGMPC9idXR0b24+XG4gICAgICBgO1xuICAgIH0gZWxzZSBpZiAobWFpbiAmJiBlbXB0eSkge1xuICAgICAgZWxlbWVudENsYXNzZXMgPSAndmctcGhvdG8gdmctcGhvdG8tLW1haW4nO1xuICAgICAgYnV0dG9ucyA9IGBcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidmctcGhvdG9fX2J1dHRvbiB2Zy1idXR0b25cIiBkYXRhLWFjdGlvbj1cInVwbG9hZC1waG90b1wiPtCX0LDQs9GA0YPQt9C40YLRjDwvYnV0dG9uPlxuICAgICAgYDtcbiAgICB9IGVsc2UgaWYgKCFtYWluICYmIGVtcHR5KSB7XG4gICAgICBlbGVtZW50Q2xhc3NlcyA9ICd2Zy1nYWxsZXJ5X19pdGVtIHZnLXBob3RvIHZnLXBob3RvLS11cGxvYWQnO1xuICAgICAgYnV0dG9ucyA9IGBcbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidmctcGhvdG9fX2J1dHRvbiB2Zy1idXR0b24gdmctYnV0dG9uLS11cGxvYWRcIiBkYXRhLWFjdGlvbj1cInVwbG9hZC1waG90b1wiPiYjNDM7PC9idXR0b24+XG4gICAgICBgO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50Q2xhc3NlcyA9ICd2Zy1nYWxsZXJ5X19pdGVtIHZnLXBob3RvJztcbiAgICAgIGJ1dHRvbnMgPSBgXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInZnLXBob3RvX19idXR0b24gdmctYnV0dG9uIHZnLWJ1dHRvbi0tZ3JlZW5cIiBkYXRhLWFjdGlvbj1cImNob29zZS1waG90b1wiPtCS0YvQsdGA0LDRgtGMPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInZnLXBob3RvX19idXR0b24gdmctYnV0dG9uIHZnLWJ1dHRvbi0tcmVkXCIgZGF0YS1hY3Rpb249XCJyZW1vdmUtcGhvdG9cIj7Qo9C00LDQu9C40YLRjDwvYnV0dG9uPlxuICAgICAgYDtcbiAgICB9XG5cbiAgICByZXR1cm4gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIiR7ZWxlbWVudENsYXNzZXN9XCJcbiAgICAgICAgICAgICAgICAke2JhY2tncm91bmRJbWFnZX1cbiAgICAgICAgICAgICAgICBkYXRhLXBob3RvLWlkPVwiJHtwaG90b0lkfVwiXG4gICAgICAgICAgICAgICAgJHttYWluQXR0cmlidXRlfT5cbiAgICAgICAgICAgICAgICAke2J1dHRvbnN9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYDtcbiAgfVxuXG4gIHN0YXRpYyBpbml0RXZlbnRzKCkge1xuICAgIGNvbnN0IHtyb290RWxlbWVudH0gPSB0aGlzO1xuICAgIGNvbnN0IGJ1dHRvbnMgPSByb290RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKCdidXR0b24nKTtcblxuICAgIGJ1dHRvbnMuZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yb3V0ZXJbYnV0dG9uLmRhdGFzZXQuYWN0aW9uXSwgZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJvdXRlciA9IHtcbiAgICAndXBsb2FkLXBob3RvJzogKGUpID0+IHtcbiAgICAgIGNvbnN0IGZpbGVJbnB1dCA9IHRoaXMucm9vdEVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbdHlwZT1cImZpbGVcIl0nKTtcblxuICAgICAgZmlsZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMucm91dGVyWydmaWxlLWlucHV0LWNoYW5nZWQnXSk7XG4gICAgICBmaWxlSW5wdXQuY2xpY2soKTtcbiAgICB9LFxuICAgICdmaWxlLWlucHV0LWNoYW5nZWQnOiAoZSkgPT4ge1xuICAgICAgY29uc3QgZmlsZSA9IGUudGFyZ2V0LmZpbGVzWzBdO1xuICAgICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG5cbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkUGhvdG8ocmVhZGVyLnJlc3VsdClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZWFkZXIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGDQntGI0LjQsdC60LAg0LfQsNCz0YDRg9C30LrQuCDRhNC+0YLQvtCz0YDQsNGE0LjQuCAoLdC40LkpOiAke3JlYWRlci5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICdyZW1vdmUtcGhvdG8nOiAoZSkgPT4ge1xuICAgICAgY29uc3QgcGhvdG9FbGVtZW50ID0gZS50YXJnZXQuY2xvc2VzdCgnLnZnLXBob3RvJyk7XG4gICAgICBjb25zdCB7cGhvdG9JZH0gPSBwaG90b0VsZW1lbnQuZGF0YXNldDtcblxuICAgICAgaWYgKCEhcGhvdG9JZCkge1xuICAgICAgICB0aGlzLmRlbGV0ZVBob3RvKHBob3RvSWQpXG4gICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAgIHRoaXMuZHJhdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgJ3VwZGF0ZS1waG90byc6IChlKSA9PiB7XG4gICAgICBjb25zdCBwaG90b0VsZW1lbnQgPSBlLnRhcmdldC5jbG9zZXN0KCcudmctcGhvdG8nKTtcbiAgICAgIGNvbnN0IHtwaG90b0lkfSA9IHBob3RvRWxlbWVudC5kYXRhc2V0O1xuXG4gICAgICBpZiAoISFwaG90b0lkKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGhvdG8ocGhvdG9JZClcbiAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgICAgdGhpcy5kcmF3KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIG1vZHVsZSBleHBvcnRzIG11c3QgYmUgcmV0dXJuZWQgZnJvbSBydW50aW1lIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDk0Nik7XG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iXSwic291cmNlUm9vdCI6IiJ9