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
                        // "{{drawImage(artwork.image)}}" +
                        // "<div ng-repeat = 'annotation in artwork.annotations'>" +
                        //     "{{drawAnnotation(annotation)}}" +
                        // "</div>" +
                    "</canvas>",
                    //"<div id=annotation-text> /*push the text from the corresponding focused shape here*/ </div>",
        link: function(scope, element, attribute) {
            var w, h, stage, canvas;

            var init = function() {
                canvas = document.getElementById("main-canvas");
                stage = new createjs.Stage(canvas);

                // enable touch interactions if supported on the current device:
                //createjs.Touch.enable(stage);

                // enabled mouse over / out events
                //stage.enableMouseOver(10);
                //stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
            }

            var drawImage = function( image ){
                var bitmap = new createjs.Bitmap(image.src);
                bitmap.x = 100;
                bitmap.y = 100;
                stage.addChild(bitmap);
                bitmap.image.onload = function() { stage.update(); };
                //stage.update();
            }

            var drawCircle = function( shape ){
              var circle = new createjs.Shape();
              circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
              circle.x = 100;
              circle.y = 100;
              stage.addChild(circle);
              stage.update();
                   //TODO: draw image

            }

            var drawSquare = function( image ){
              var circle = new createjs.Shape();
              circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
              circle.x = 100;
              circle.y = 100;
              stage.addChild(circle);
              stage.update();
                   //TODO: draw image

            }

            var drawCircle = function( image ){
              var circle = new createjs.Shape();
              circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
              circle.x = 100;
              circle.y = 100;
              stage.addChild(circle);
              stage.update();
                   //TODO: draw image

            }


            var drawAnnotation = function( annotation ){
                var liveShape = annotation.shape;
                if (scope.stage) {
                       scope.stage.autoClear = true;
                       scope.stage.removeAllChildren();
                       scope.stage.update();
                   } else {
                       scope.stage = new createjs.Stage(element[0]);
                   }
                   w = scope.stage.canvas.width;
                   h = scope.stage.canvas.height;

                   //TODO: draw liveShape

                   liveShape.on("click", function() {
                        showText(annotation.text);
                    });
            }

            var showText = function (text){
                document.getElementById('annotation-text').innerHTML = text;
            }

            init();
            drawImage();
        }
    };
});