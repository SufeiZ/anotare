'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */

angular.module('anotareApp')
  .directive('displayAnnotation', function () {
    return {
      restrict : 'E',
      replace : true,
      template :  "<canvas id='main-canvas' width='960' height='800'>" +
                  // "<img id='main-image' ng-src={{scope.mainImageSource}}>" +
        // "{{drawImage(artwork.image)}}" +
        // "<div ng-repeat = 'annotation in artwork.annotations'>" +
        //     "{{drawAnnotation(annotation)}}" +
        // "</div>" +
      "</canvas>",
      //"<div id=annotation-text> /*push the text from the corresponding focused shape here*/ </div>",
      link: function(scope, element, attribute) {
        var canvas, canvasWidth, canvasHeight;
        var image = scope.image;

        var init = function() {
          canvas = document.getElementById("main-canvas");
          paper.setup(canvas);
          var path = new paper.Path();
        }

        var drawImage = function( image ){
          // scope.mainImageSource = image.src;
          var raster = new paper.Raster(image.src);
          // // Move the raster to the center of the view
          raster.position = paper.view.center;
        }

        var drawCircle = function( shape ){
          var circle = new paper.Path.Circle(new paper.Point(shape.x, shape.y), shape.radius);
          circle.strokeColor = 'red';
        };

        var drawRect = function( shape ){
          var rect = new paper.Path.Rectangle(shape.x, shape.y, shape.width, shape.height);
          rect.strokeColor = 'red';
        };

        var drawEllipse = function( shape ){
          var ellipse = new paper.Path.Ellipse(shape.x, shape.y, shape.width, shape.height);
          ellipse.strokeColor = 'red';
        };

        var drawPin = function( shape ){
          var pin = new paper.Path.Circle(new paper.Point(shape.x, shape.y), 3);
          pin.fillColor = 'yellow';
        };

        // var drawEllipse = function( shape ){
        //   var ellipse = new createjs.Shape();
        //   ellipse.graphics.beginFill(createjs.Graphics.getRGB("white", 0.01));
        //   ellipse.graphics.setStrokeStyle(2).beginStroke("red");
        //   ellipse.graphics.drawEllipse(0, 0, shape.width, shape.height);
        //   ellipse.x = shape.x;
        //   ellipse.y = shape.y;
        //   stage.addChild(ellipse);
        //   dragAndDrop(ellipse);
        //   rightClick(ellipse);
        // };

        // var drawPin = function( shape ){
        //   var pin = new createjs.Shape();
        //   pin.graphics.beginFill("Yellow");
        //   pin.graphics.drawCircle(0, 0, 5);
        //   pin.x = shape.x;
        //   pin.y = shape.y;
        //   stage.addChild(pin);
        //   dragAndDrop(pin);
        //   rightClick(pin);
        // };

        // var dragAndDrop = function( shape ){
        //   shape.on("pressmove", function(evt) {
        //     evt.target.x = evt.stageX;
        //     evt.target.y = evt.stageY;
        //     stage.update();
        //   });
        //   //shape.on("pressup", function(evt) {
        //   //  console.log("up");
        //   //  console.log(shape.x, shape.y);
        //   //})
        // };

        // var rightClick = function( shape ){
        //   shape.addEventListener('mousedown',function(e){
        //     if(e.nativeEvent.button == 2){
        //       e.preventDefault(); //TODO:fix rightClick default menu
        //       document.getElementById("rightMenu").className = "showMenu";
        //       document.getElementById("rightMenu").style.top = mouseY(event) +"px";
        //       document.getElementById("rightMenu").style.left = mouseX(event) +"px";

        //       window.event.returnValue = false;
        //     }
        //   })
        // };

        // var mouseX = function(evt){
        //   if (evt.pageX) {
        //     return evt.pageX;
        //   } else if (evt.clientX) {
        //     return evt.clientX + (document.documentElement.scrollLeft ?
        //         document.documentElement.scrollLeft :
        //         document.body.scrollLeft);
        //   } else {
        //     return null;
        //   }
        // };

        // var mouseY = function(evt){
        //   if (evt.pageY) {
        //     return evt.pageY;
        //   } else if (evt.clientY) {
        //     return evt.clientY + (document.documentElement.scrollTop ?
        //         document.documentElement.scrollTop :
        //         document.body.scrollTop);
        //   } else {
        //     return null;
        //   }
        // };

        // $(document).bind("click", function (event) {
        //   document.getElementById("rightMenu").className = "hide";
        // });

        var drawAnnotations = function( annotations ){
          annotations.forEach(function(annotation){
            if (annotation.type === 'circle'){
              drawCircle(annotation);
            }
            else if (annotation.type === 'rectangle'){
               drawRect(annotation);
            }
            else if (annotation.type === 'ellipse'){
              drawEllipse(annotation);
            }
            else if(annotation.type === 'pin'){
              drawPin(annotation);
            }
            else{
              console.log('shape' + annotation.type + 'is unidentified');
            }
          });
        };

        // var showText = function (text){
        //   document.getElementById('annotation-text').innerHTML = text;
        // };

        init();
        drawImage(image);
        drawAnnotations(image.annotations);
        // drawPin();
      }
    };
  });
