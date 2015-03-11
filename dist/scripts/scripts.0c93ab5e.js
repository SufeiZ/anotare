"use strict";angular.module("anotareApp",["ngAnimate","ngCookies","ngResource","ngSanitize","ngTouch","ui.router"]).config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("/main"),a.state("index",{url:"/main",templateUrl:"views/main.html"}).state("annotation",{url:"/annotation",templateUrl:"views/annotation.html",controller:"AnnotationCtrl"})}]),angular.module("anotareApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("anotareApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("anotareApp").controller("AnnotationCtrl",["$scope","Album",function(a,b){a.image=b[0]}]),angular.module("anotareApp").directive("displayAnnotation",function(){return{restrict:"E",replace:!0,template:"<canvas id='main-canvas' width='960' height='800'></canvas>",link:function(a){var b,c,d=a.image,e=function(){c=document.getElementById("main-canvas"),b=new createjs.Stage(c)},f=function(a){var c=new createjs.Bitmap(a.src);c.x=100,c.y=100,b.addChild(c),c.image.onload=function(){b.update()},b.update()},g=function(a){var c=new createjs.Shape;c.graphics.beginFill(createjs.Graphics.getRGB("white",.01)),c.graphics.setStrokeStyle(2).beginStroke("red"),c.graphics.drawCircle(0,0,a.radius),c.x=a.x,c.y=a.y,b.addChild(c),k(c)},h=function(a){var c=new createjs.Shape;c.graphics.beginFill(createjs.Graphics.getRGB("white",.01)),c.graphics.setStrokeStyle(2).beginStroke("red"),c.graphics.drawRect(0,0,a.width,a.height),c.x=a.x,c.y=a.y,b.addChild(c),k(c)},i=function(a){var c=new createjs.Shape;c.graphics.beginFill(createjs.Graphics.getRGB("white",.01)),c.graphics.setStrokeStyle(2).beginStroke("red"),c.graphics.drawEllipse(0,0,a.width,a.height),c.x=a.x,c.y=a.y,console.log("ellipse!!"),b.addChild(c),k(c)},j=function(a){var c=new createjs.Shape;c.graphics.beginFill("Yellow"),c.graphics.drawCircle(0,0,5),c.x=a.x,c.y=a.y,b.addChild(c),k(c)},k=function(a){a.on("pressmove",function(a){a.target.x=a.stageX,a.target.y=a.stageY,b.update()}),a.on("pressup",function(){console.log("up")})},l=function(a){a.forEach(function(a){"circle"===a.type?g(a):"rectangle"===a.type?h(a):"ellipse"===a.type?i(a):"pin"===a.type?j(a):console.log("shape"+a.type+"is unidentified")})};e(),f(d),l(d.annotations)}}}),angular.module("anotareApp").factory("Album",function(){var a=[{src:"images/picasso.jpg",annotations:[{type:"circle",x:"350",y:"300",radius:"30"},{type:"rectangle",x:"150",y:"150",height:"20",width:"50"},{type:"ellipse",x:"170",y:"200",height:"30",width:"15"},{type:"circle",x:"200",y:"400",radius:"60"},{type:"pin",x:"300",y:"300"}]}];return a});