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
      template :"<div class='' id='annotation-body'>" +  
                  "<div class='editing-menu'>" +
                    "<a href='' ng-click='switchEditMode()'>edit mode: {{editMode ? 'on' : 'off'}}</a>" +  
                  "</div>" +
                  "<canvas id='main-canvas'>" +
                  "</canvas>" +
                  "<div id='annotation-text'> </div>" +
                "</div>",
      link: function(scope, element, attribute, event) {
        // scope.editMode = false;
        var canvas, image, shapeLastClicked;

        //global styles to be used on the shapes
        var styleStandard = {
          strokeColor: new paper.Color(0.8,0.9),
          strokeWidth: 1.5,
          fillColor: new paper.Color(0,0,0,0)
        };
        var styleSufei = {
          strokeColor: new paper.Color(1,1,0,1),
          strokeWidth: 1.5,
          fillColor: new paper.Color(1,1,0,1)
        };
        var stylePin = {
          strokeColor: new paper.Color(0.8,0.9),
          strokeWidth: 1.5,
          fillColor: new paper.Color(0.8,0.9)
        };
        var styleHover = {
          strokeColor: new paper.Color(0.7,0.1,0.1,1),
          strokeWidth: 2.0,
          fillColor: new paper.Color(0,0,0,0.1)
        };
        var styleActive = {
          strokeColor: new paper.Color(0.9,0.1,0.1,1),
          strokeWidth: 3.0,
          fillColor: new paper.Color(0,0,0,0.3)
        };
        var styleFrame = {
          strokeColor: new paper.Color(0,0,1,1),
          strokeWidth: 1
        };
        var styleFrameSelector = {

          fillColor: new paper.Color(0.2,0.2,0.8,1),
          strokeColor: new paper.Color(1,1,1,1),
          strokeWidth: 0.3
        };


        var init = function() {
          canvas = document.getElementById("main-canvas");
          canvas.setAttribute("width", screen.availWidth*.55);
          canvas.setAttribute("height", screen.availHeight*.75);

          paper.setup(canvas);
          //ajax http get method to get image object from database
          scope.getImage();
        }

        // var getShapes = function() {
        //   if (typeof paper !== 'undefined'){
        //     return paper.project.layers[0].children;
        //   }
        //   return null;
        // }

        scope.switchEditMode = function(){
          scope.editMode = !scope.editMode;
          if (typeof shapeLastClicked !== 'undefined') {
            shapeLastClicked.frame.toggleVisibility(!shapeLastClicked.frame.visible);
          }
        }

        //draw the image
        var drawImage = function( image ){

          //resize the image to max in the canvas
          var resizeRaster = function(){
            var height = this._size.height;
            var width = this._size.width;
            var scale = Math.max(height/canvas.height, width/canvas.width);
            this.height = height * scale;
            this.width = width * scale;
          }

          var raster = new paper.Raster(image.src);
          raster.type = 'main-image';
          raster.onLoad = resizeRaster;
          raster.position = paper.view.center;
        } 

        

        //draw shapes on the image/Raster
        var drawAnnotations = function( annotations ){

          //function closure ftw
          var mouseActionsOn = function(shape){

            //hover effect
            var mouseEnterEffect = function(shape){
              $('html,body').css('cursor','pointer');
              if (!shape.active){
                shape.style = styleHover;
              }
            }

            //unhover effect
            var mouseLeaveEffect = function(shape){
              $('html,body').css('cursor','default');
              if (!shape.active){
                if (shape.type === 'pin') {
                  shape.style = stylePin;
                }
                else {
                  shape.style = styleStandard;
                }
              }
            }

            //only activated when editMode is true
            var mouseDragEffect = function(event, shape) {

              //prevent dragging shapes outside of the canvas
              var dragBound = function(point,shape){
                var halfHeight = shape.bounds.height/2;
                var halfWidth = shape.bounds.width/2;

                if(point.x < halfWidth || point.x > canvas.width - halfWidth || 
                  point.y < halfHeight || point.y > canvas.height - halfHeight)
                  return false;

                return true;
              }

              if (scope.editMode && dragBound(event.point,shape)){
                // console.log(shape.frame);
                shape.position = event.point;
                shape.frame.setFramePosition(event.point);
              }
            }

            //give an active effect when shape is cliced, show frame only when editMode is true
            //shapeLastClicked is a 'global' variable to determine which shape was last clicked
            var mouseClickEffect = function(shape) {
              if (typeof shapeLastClicked !== 'undefined' && shapeLastClicked !== shape ){
                if (shapeLastClicked.type === 'pin') {
                    shapeLastClicked.style = stylePin;
                }
                else {
                  shapeLastClicked.style = styleStandard;
                }
                shapeLastClicked.active = false;
                if (scope.editMode){
                  shapeLastClicked.frame.toggleVisibility(false);
                }
              }
              shapeLastClicked = shape;
              shape.active = true;
              shape.style = styleActive;
              if (scope.editMode){
                  shape.frame.toggleVisibility(true);
              }
              //show the text corresponding to the shape
              document.getElementById('annotation-text').innerHTML = shape.text;
            }

            //override the mouse actions of shape
            shape.onMouseDrag   = function(event) { mouseDragEffect  ( event, shape ) };
            shape.onMouseEnter  = function() { mouseEnterEffect ( shape ) };
            shape.onMouseLeave  = function() { mouseLeaveEffect ( shape ) };
            shape.onClick       = function() { mouseClickEffect ( shape ) };

          };
          //end mouseActionsOn

          //create frames around the shapes for editMode
          var drawFrameOn = function(shape){
           
            var topLeft = new paper.Point(shape.bounds.topLeft.x-3, 
              shape.bounds.topLeft.y-3);
            var topRight = new paper.Point(shape.bounds.topRight.x+3, 
              shape.bounds.topRight.y-3);
            var bottomLeft = new paper.Point(shape.bounds.bottomLeft.x-3, 
              shape.bounds.bottomLeft.y+3);
            var bottomRight = new paper.Point(shape.bounds.bottomRight.x+3, 
              shape.bounds.bottomRight.y+3);
            var frameSize = new paper.Size(shape.bounds.width + 6, shape.bounds.height+6);

            

            var frame = new paper.Path.Rectangle(topLeft,frameSize);
            frame.type = 'frame';
            frame.style = styleFrame;
            frame.visible = false;
            frame.rectTopLeft = new paper.Path.Rectangle({
              width: 5,
              height: 5,
              style: styleFrameSelector,
              position: topLeft,
              visible:  false,
              onMouseEnter: function(shape){
                $('html,body').css('cursor','nwse-resize');
              },
              onMouseLeave: function(shape){
                $('html,body').css('cursor','default');
              },
              onMouseDrag: function(event){
                shape.bounds.setTopLeft(event.point.x+3, event.point.y+3);
                shape.frame.bounds.setTopLeft(event.point);
                shape.frame.rectTopLeft.setPosition(event.point);
                shape.frame.rectTopRight.position.setY(event.point.y);
                shape.frame.rectBottomLeft.position.setX(event.point.x);
              }
            });
            frame.rectTopRight = new paper.Path.Rectangle({
              width: 5,
              height: 5,
              style: styleFrameSelector,
              position: topRight,
              visible: false,
              onMouseEnter: function(shape){
                $('html,body').css('cursor','nesw-resize');
              },
              onMouseLeave: function(shape){
                $('html,body').css('cursor','default');
              },
              onMouseDrag: function(event){
                shape.bounds.setTopRight(event.point.x-3, event.point.y+3);
                shape.frame.bounds.setTopRight(event.point);
                shape.frame.rectTopRight.setPosition(event.point);
                shape.frame.rectTopLeft.position.setY(event.point.y);
                shape.frame.rectBottomRight.position.setX(event.point.x);
              }
            });
            frame.rectBottomLeft = new paper.Path.Rectangle({
              width: 5,
              height: 5,
              style: styleFrameSelector,
              position: bottomLeft,
              visible: false,
              onMouseEnter: function(shape){
                $('html,body').css('cursor','nesw-resize');
              },
              onMouseLeave: function(shape){
                $('html,body').css('cursor','default');
              },
              onMouseDrag: function(event){
                shape.bounds.setBottomLeft(event.point.x+3, event.point.y-3);
                shape.frame.bounds.setBottomLeft(event.point);
                shape.frame.rectBottomLeft.setPosition(event.point);
                shape.frame.rectBottomRight.position.setY(event.point.y);
                shape.frame.rectTopLeft.position.setX(event.point.x);
              }
            });
            frame.rectBottomRight = new paper.Path.Rectangle({
              width: 5,
              height: 5,
              style: styleFrameSelector,
              position: bottomRight,
              visible: false,
              onMouseEnter: function(shape){
                $('html,body').css('cursor','nwse-resize');
              },
              onMouseLeave: function(shape){
                $('html,body').css('cursor','default');
              },
              onMouseDrag: function(event){
                shape.bounds.setBottomRight(event.point.x-3, event.point.y-3);
                shape.frame.bounds.setBottomRight(event.point);
                shape.frame.rectBottomRight.setPosition(event.point);
                shape.frame.rectBottomLeft.position.setY(event.point.y);
                shape.frame.rectTopRight.position.setX(event.point.x);
              }
            });
            frame.toggleVisibility = function (isVisible){
              frame.visible = isVisible;
              frame.rectTopLeft.visible = isVisible;
              frame.rectTopRight.visible = isVisible;
              frame.rectBottomRight.visible = isVisible;
              frame.rectBottomLeft.visible = isVisible;
            }

            frame.setFramePosition = function (point){
              frame.position = point;

            }

            shape.frame = frame;
          };
          //end createFrame

          var drawCircle = function( shape ){
            var circle = new paper.Path.Circle({
              radius: shape.radius,
              style: styleStandard,
            });
            return circle;
          };

          var drawRect = function( shape ){
            var rect = new paper.Path.Rectangle({
              width: shape.width,
              height: shape.height,
              style: styleStandard
            });
            return rect;
          };

          var drawEllipse = function( shape ){
            var ellipse = new paper.Path.Ellipse({
              width: shape.width,
              height: shape.height,
              style: styleStandard
            });
            return ellipse;
          };

          var drawPin = function( shape ){
            var pin = new paper.Path.Circle({
              radius: 3,
              style: stylePin
            });
            return pin;
          };

          //draw every annotation from annotations
          annotations.forEach(function(annotation){
            var shape;

            if (annotation.type === 'circle'){
              shape = drawCircle(annotation);
            }
            else if (annotation.type === 'rectangle'){
              shape = drawRect(annotation);
            }
            else if (annotation.type === 'ellipse'){
              shape = drawEllipse(annotation);
            }
            else if(annotation.type === 'pin'){
              shape = drawPin(annotation);
            }

            //creating the frame and overriding mouse actions on every shape
            if (typeof shape !== 'undefined') {
              shape.type = annotation.type;
              shape.position.setX(annotation.x);
              shape.position.setY(annotation.y);
              shape.text = annotation.text;
              shape.active = false;
              drawFrameOn(shape);
              mouseActionsOn(shape);
            }
            //shape is unidentified
            else{
              console.log('Shape' + annotation.type + 'is unidentified');
            }

          });
        };
        //end drawAnnotations

        //wrapper function to draw image, annotation, frame, and the implement the mouse actions on the shapes
        var drawAll = function(image){
          if (typeof image !== 'undefined') {
            drawImage(image);
            drawAnnotations(image.annotations);
          }
        };

        //watch if there is any change in imageScope, handles ajax call to the imagescope
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

        //setup canvas
        init();
        
      }
    };
  });
