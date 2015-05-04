"use strict";angular.module("anotareApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/"),a.state("welcome",{url:"/",templateUrl:"views/welcome.html"}).state("explore",{url:"/explore",templateUrl:"views/explore.html"}).state("annotation",{url:"/annotation",templateUrl:"views/annotation.html",controller:"AnnotationCtrl"})}]),angular.module("anotareApp").controller("AnnotationCtrl",["$scope","$http","AlbumService",function(a,b,c){a.imageScope,a.editMode=!1,a.toolIcons=[{url:"/images/tool-line.png",name:"line-tool"},{url:"/images/tool-square.png",name:"square-tool"},{url:"/images/tool-circle.png",name:"circle-tool"},{url:"/images/tool-trig.png",name:"trig-tool"}],a.getImage=function(){c.getImage().then(function(b){a.imageScope=b.data.Album},function(a){console.log("Failed to get the image, result is "+a.toString())})}}]),angular.module("anotareApp").directive("displayAnnotation",function(){return{restrict:"E",replace:!0,template:"<div class='' id='annotation-body'><div class='editing-menu'><a href='' ng-click='switchEditMode()'>edit mode: {{editMode ? 'on' : 'off'}}</a></div><canvas id='main-canvas'></canvas><div id='annotation-text'> </div></div>",link:function(a,b,c,d){a.editMode=!1;var e,f,g,h={strokeColor:new paper.Color(.8,.9),strokeWidth:1.5,fillColor:new paper.Color(0,0,0,.2)},i=({strokeColor:new paper.Color(1,1,0,1),strokeWidth:1.5,fillColor:new paper.Color(1,1,0,1)},{strokeColor:new paper.Color(.8,.9),strokeWidth:1.5,fillColor:new paper.Color(.8,.9)}),j={strokeColor:new paper.Color(.7,.1,.1,1),strokeWidth:2,fillColor:new paper.Color(0,0,0,0)},k=({strokeColor:new paper.Color(.9,.1,.1,1),strokeWidth:3,fillColor:new paper.Color(0,0,0,.3)},{strokeColor:new paper.Color(0,0,1,1),strokeWidth:1},{fillColor:new paper.Color(.2,.2,.8,1),strokeColor:new paper.Color(1,1,1,1),strokeWidth:.3},function(){e=document.getElementById("main-canvas"),e.setAttribute("width",.55*screen.availWidth),e.setAttribute("height",.75*screen.availHeight),paper.setup(e),a.getImage()});a.switchEditMode=function(){a.editMode=!a.editMode,"undefined"!=typeof g&&(a.editMode?n(g,"makeNew"):(g.removeSegments(),g.frame.remove()))};var l=function(a){var b=function(){var a=this._size.height,b=this._size.width,c=Math.max(a/e.height,b/e.width);this.height=a*c,this.width=b*c},c=new paper.Raster(a.src);c.type="main-image",c.onLoad=b,c.position=paper.view.center,c.onClick=function(){"undefined"!=typeof g&&(g.style=h,g.active=!1,g.frame&&(g.removeSegments(),g.frame.remove()))}},m=function(a,b,c){var d=function(a,b){return(a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)},e=d(a,b),f=d(a,c),g=d(b,c),h=180*Math.acos((e+f-g)/(2*Math.sqrt(e)*Math.sqrt(f)))/Math.PI;return h},n=function(a,b){var c=function(a){var b=a.bounds.clone().expand(5,5);a.frame=new paper.Path.Rectangle(b),a.frame.strokeWidth=1,a.frame.strokeColor="blue",a.frame.insert(2,new paper.Point(b.center.x,b.top)),a.frame.insert(2,new paper.Point(b.center.x,b.top-15)),a.frame.insert(2,new paper.Point(b.center.x,b.top))},d=function(a){a.frame.bottomLeftSegment=new paper.Path.Rectangle({x:a.frame.segments[0].point.x-2.5,y:a.frame.segments[0].point.y-2.5,width:5,height:5,fillColor:"white",strokeColor:"blue",strokeWidth:1,onMouseDrag:function(b){a.bounds.setBottomLeft(b.point),n(a,"updateAll")}}),a.frame.topLeftSegment=new paper.Path.Rectangle({x:a.frame.segments[1].point.x-2.5,y:a.frame.segments[1].point.y-2.5,width:5,height:5,fillColor:"white",strokeColor:"blue",strokeWidth:1,onMouseDrag:function(b){a.bounds.setTopLeft(b.point),n(a,"updateAll")}}),a.frame.topRightSegment=new paper.Path.Rectangle({x:a.frame.segments[5].point.x-2.5,y:a.frame.segments[5].point.y-2.5,width:5,height:5,fillColor:"white",strokeColor:"blue",strokeWidth:1,onMouseDrag:function(b){a.bounds.setTopRight(b.point),n(a,"updateAll")}}),a.frame.bottomRightSegment=new paper.Path.Rectangle({x:a.frame.segments[6].point.x-2.5,y:a.frame.segments[6].point.y-2.5,width:5,height:5,fillColor:"white",strokeColor:"blue",strokeWidth:1,onMouseDrag:function(b){a.bounds.setBottomRight(b.point),n(a,"updateAll")}}),a.frame.rotateSegment=new paper.Path.Rectangle({x:a.frame.segments[3].point.x-2.5,y:a.frame.segments[3].point.y-2.5,width:5,height:5,fillColor:"white",strokeColor:"blue",strokeWidth:1,onMouseDrag:function(b){var c=m(a.bounds.center,a.frame.segments[3].point,b.point);a.rotate(c),a.frame.rotate(c),n(a,"updateSegments"),a.frame.bottomRightSegment.rotate(c),a.frame.bottomLeftSegment.rotate(c),a.frame.topRightSegment.rotate(c),a.frame.topLeftSegment.rotate(c),a.frame.rotateSegment.rotate(c)}})},e=function(){a.frame.bottomLeftSegment.remove(),a.frame.bottomRightSegment.remove(),a.frame.topLeftSegment.remove(),a.frame.topRightSegment.remove(),a.frame.rotateSegment.remove()};a.removeSegments=e,"makeNew"===b?(c(a),d(a)):a.frame&&"updateAll"===b?(e(a),a.frame.remove(),c(a),d(a)):a.frame&&"updateSegments"===b&&(e(a),d(a))},o=function(b){var c=function(b){var c=function(a){$("html,body").css("cursor","pointer"),a.active||(a.style=j)},d=function(a){$("html,body").css("cursor","default"),a.active||("pin"===a.type?a.style=i:a.style=h)},f=function(b,c){var d=function(a,b){var c=b.bounds.height/2,d=b.bounds.width/2;return a.x<b.bounds||a.x>e.width-d||a.y<c||a.y>e.height-c?!1:!0};a.editMode&&d(b.point,c)&&(c.position=b.point,n(c,"updateAll"))},k=function(b){"undefined"!=typeof g&&g!==b&&("pin"===g.type?g.style=i:g.style=h,g.active=!1,a.editMode&&(g.removeSegments(),g.frame.remove())),g=b,a.editMode&&(b.frame?n(b,"updateAll"):n(b,"makeNew")),b.active=!0,document.getElementById("annotation-text").innerHTML=b.text};b.onMouseDrag=function(a){f(a,b)},b.onMouseEnter=function(){c(b)},b.onMouseLeave=function(){d(b)},b.onClick=function(){k(b)}},d=function(a){var b=new paper.Path.Circle({radius:a.radius,style:h});return b},f=function(a){var b=new paper.Path.Rectangle({width:a.width,height:a.height,style:h});return b},k=function(a){var b=new paper.Path.Ellipse({width:a.width,height:a.height,style:h});return b},l=function(a){var b=new paper.Path.Circle({radius:3,style:i});return b};b.forEach(function(a){var b;"circle"===a.type?b=d(a):"rectangle"===a.type?b=f(a):"ellipse"===a.type?b=k(a):"pin"===a.type&&(b=l(a)),"undefined"!=typeof b?(b.type=a.type,b.position.setX(a.x),b.position.setY(a.y),b.text=a.text,b.active=!1,c(b)):console.log("Shape"+a.type+"is unidentified")})},p=function(a){"undefined"!=typeof a&&(l(a),o(a.annotations))};a.$watch("imageScope",function(a,b){"undefined"==typeof a||a.length<=0?f=b:(f=a,p(f))}),k()}}}),angular.module("anotareApp").directive("dropTool",function(){return{restrict:"E",replace:!0,templateUrl:"views/dropdown.html",link:function(a,b,c,d){var e=$("#main-canvas"),f=$("#dropdown-context");e.bind("click",function(a){a.preventDefault(),f.css({top:a.pageY+"px",left:a.pageX+"px",display:"block"})}),a.dropdownClick=function(b){console.log(a.toolIcons[b].name)}}}}),angular.module("anotareApp").factory("AlbumService",["$http",function(a){var b={getImage:function(){return a.get("data/album.json").success(function(a){return a.Album}).error(function(a,b){console.log("Oh no! An error! Error status: "+b)})}};return b}]);