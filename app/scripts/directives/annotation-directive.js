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

        var createFrame = function(shape){
          var frame = new paper.Path();
          frame.strokeColor = 'blue';
          frame.strokeWidth = .5;
          frame.closed = true;
          frame.visible = false;
          
          var topLeft = new paper.Point(shape.bounds.topLeft.x-3, 
            shape.bounds.topLeft.y-3);
          var topRight = new paper.Point(shape.bounds.topRight.x+3,
            shape.bounds.topRight.y-3);
          var bottomRight = new paper.Point(shape.bounds.bottomRight.x+3,
            shape.bounds.bottomRight.y+3);
          var bottomLeft = new paper.Point(shape.bounds.bottomLeft.x-3,
            shape.bounds.bottomLeft.y+3);

          //TODO: display little rects
          // var rectTopLeft = new paper.Rectangle({
          //   width: 10,
          //   height: 10,
          //   strokeColor: 'blue',
          //   strokeWidth: 1
          // })
          // rectTopLeft.center = topLeft;
          // console.log(rectTopLeft);

          frame.add(topLeft, topRight, bottomRight, bottomLeft);
          return frame;
        }

        var showFrame = function(event){
          this.children[1].visible = true;
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

          var circleFrame = createFrame(circle);
          var circleGroup = new paper.Group([circle,circleFrame]);
          circleGroup.onMouseDrag = mouseDrag;

          circleGroup.onClick = showFrame;

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

          var rectFrame = createFrame(rect);
          var rectGroup = new paper.Group([rect,rectFrame]);

          rectGroup.onMouseDrag = mouseDrag;

          rectGroup.onClick = showFrame;
          
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

          var ellipseFrame = createFrame(ellipse);
          var ellipseGroup = new paper.Group([ellipse,ellipseFrame]);

          ellipseGroup.onMouseDrag = mouseDrag;

          ellipseGroup.onClick = showFrame;
          
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
