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
      template :"<div>" +  
                  "<canvas id='main-canvas' width='960' height='800'>" +
                  "</canvas>" +
                  "<div id='annotation-text'> </div>" +
                  "<a href='' ng-click='switchEditMode()'>edit mode</a>" +
                "</div>",
      link: function(scope, element, attribute, event) {
        var canvas, canvasWidth, canvasHeight;
        var editMode = false;
        var image = scope.image;

        scope.switchEditMode = function(){
          editMode = !editMode;
          console.log(editMode);
        }

        var init = function() {
          canvas = document.getElementById("main-canvas");
          paper.setup(canvas);
          var path = new paper.Path();
        }

        var drawImage = function( image ){
          var raster = new paper.Raster(image.src);
          raster.position = paper.view.center;
        }

        var mouseDrag = function(event){
          this.position = event.point;
        }

        var showText = function (text){
          document.getElementById('annotation-text').innerHTML = text;
        };

        var createFrame = function(shape,frame){
          frame.strokeColor = 'blue';
          frame.strokeWidth = .5;
          frame.closed = true;
          frame.add(shape.bounds.topLeft, shape.bounds.topRight, 
            shape.bounds.bottomRight, shape.bounds.bottomLeft);
        }

        var drawCircle = function( shape ){
          var circle = new paper.Path.Circle({
            x: shape.x,
            y: shape.y,
            radius: shape.radius,
            strokeColor : 'red',
            strokeWidth: 3,
            fillColor : new paper.Color(0,0,0,0)
          });

          var circleFrame = new paper.Path();
          createFrame(circle,circleFrame);
          var circleGroup = new paper.Group([circle,circleFrame]);
          circleGroup.onMouseDrag = mouseDrag;

          circle.onClick = function(){
            showText(shape.text);
          };
        };

        var drawRect = function( shape ){

          var rect = new paper.Path.Rectangle({
            x: shape.x,
            y: shape.y,
            width: shape.width,
            height: shape.height,
            strokeColor : 'red',
            strokeWidth: 3,
            fillColor : new paper.Color(0,0,0,0)
          });

          var rectFrame = new paper.Path();
          createFrame(rect, rectFrame);
          var rectGroup = new paper.Group([rect,rectFrame]);


          rectGroup.onMouseDrag = mouseDrag;
          
          rect.onClick = function(){
            showText(shape.text);
          };
        };

        var drawEllipse = function( shape ){
          var ellipse = new paper.Path.Ellipse({
            x: shape.x,
            y: shape.y,
            width: shape.width,
            height: shape.height,
            strokeColor: 'red',
            fillColor : new paper.Color(0,0,0,0)
          });
          ellipse.onMouseDrag = mouseDrag;
          ellipse.onClick = function(){
            showText(shape.text);
          };
        };

        var drawPin = function( shape ){
          var pin = new paper.Path.Circle({
            x: shape.x,
            y: shape.y,
            radius: 4,
            fillColor : 'yellow'
          });
          pin.onMouseDrag = mouseDrag;
          pin.onClick = function(){
            showText(shape.text);
          };
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
        };
        
        init();
        drawImage(image);
        drawAnnotations(image.annotations);
      }
    };
  });
