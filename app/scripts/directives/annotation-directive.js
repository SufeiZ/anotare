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
            var stage, canvas;
            var image = scope.image;

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
                stage.update();
            }

            var drawCircle = function( shape ){
              var circle = new createjs.Shape();
              circle.graphics.beginFill(createjs.Graphics.getRGB("white", 0.01));
              circle.graphics.setStrokeStyle(2).beginStroke("red");
              circle.graphics.drawCircle(0, 0, shape.radius);
              circle.x = shape.x;
              circle.y = shape.y;
              stage.addChild(circle);
              dragAndDrop(circle);
            };

            var drawRect = function( shape ){
              var rect = new createjs.Shape();
              rect.graphics.beginFill(createjs.Graphics.getRGB("white", 0.01));
              rect.graphics.setStrokeStyle(2).beginStroke("red");
              rect.graphics.drawRect(0, 0, shape.width, shape.height);
              rect.x = shape.x;
              rect.y = shape.y;
              stage.addChild(rect);
              dragAndDrop(rect);
            };

            var drawEllipse = function( shape ){
              var ellipse = new createjs.Shape();
              ellipse.graphics.beginFill(createjs.Graphics.getRGB("white", 0.01));
              ellipse.graphics.setStrokeStyle(2).beginStroke("red");
              ellipse.graphics.drawEllipse(0, 0, shape.width, shape.height);
              ellipse.x = shape.x;
              ellipse.y = shape.y;
              console.log("ellipse!!");
              stage.addChild(ellipse);
              dragAndDrop(ellipse);
            };

            var drawPin = function( shape ){
              var pin = new createjs.Shape();
              pin.graphics.beginFill("Yellow");
              pin.graphics.drawCircle(0, 0, 5);
              pin.x = shape.x;
              pin.y = shape.y;
              stage.addChild(pin);
              dragAndDrop(pin);
            };

            var dragAndDrop = function( shape ){
              shape.on("pressmove", function(evt) {
                  evt.target.x = evt.stageX;
                  evt.target.y = evt.stageY;
                  stage.update();
              });
              shape.on("pressup", function(evt) { console.log("up"); })
            };


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
            }

            var showText = function (text){
                document.getElementById('annotation-text').innerHTML = text;
            }

            init();
            drawImage(image);
            drawAnnotations(image.annotations);
            // drawPin();
        }
    };
});