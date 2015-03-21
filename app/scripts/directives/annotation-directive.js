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
        var image = scope.imageScope;

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

        var drawCircle = function( shape ){
          var circle = new paper.Path.Circle({
            x: shape.x,
            y: shape.y,
            radius: shape.radius,
            strokeColor : 'red',
            fillColor : new paper.Color(0,0,0,0)
          });
          circle.onMouseDrag = mouseDrag;
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
            fillColor : new paper.Color(0,0,0,0)
          });
          rect.onMouseDrag = mouseDrag;
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

        var drawAll = function(image){
          if (typeof image !== 'undefined') {
            drawImage(image);
            drawAnnotations(image.annotations);
          }
          // else {
          //   console.log('Failed to draw the image, result is ' + image);
          // }
        };

        scope.$watch('imageScope', function(newVal, oldVal) {
            if (typeof newVal === 'undefined' || newVal.length <= 0)
            {   
                image = oldVal;
            }
            else
            {  
                image = newVal;
                drawAll(image);
            }
        });
        
        init();
        scope.getImageAjax();
        drawAll(image);
      }
    };
  });
