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
      template :"<div id='annotation-body'>" +  
                  "<div class='editing-menu'>" +
                    "<a href='' ng-click='switchEditMode()'>edit mode: {{editMode ? 'on' : 'off'}}</a>" +  
                  "</div>" +
                  "<canvas id='main-canvas'>" +
                  "</canvas>" +
                  "<span ng-bind='annotationText'></span>" +
                "</div>",
      link: function(scope, element, attribute, event) {
        scope.editMode = false;
        scope.showDropdown = true;
        //prevent default right click function
        window.oncontextmenu = function() { return false;};

        var canvas, image, shapeLastClicked;

        //global styles to be used on the shapes
        var styleStandard = {
          strokeColor: new paper.Color(0.8,0.9),
          strokeWidth: 1.5,
          fillColor: new paper.Color(0,0,0,0.2)
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
          fillColor: new paper.Color(0,0,0,0)
        };
        var styleActive = {
          strokeColor: new paper.Color(0.9,0.1,0.1,1),
          strokeWidth: 3.0,
          fillColor: new paper.Color(0,0,0,0.1)
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
          scope.paper = paper;
          //ajax http get method to get image object from database
          scope.getImage();
        }

        scope.switchEditMode = function(){
          scope.editMode = !scope.editMode;
          if (scope.editMode){
            scope.showDropdown = true;
            scope.hideDropdown();
          }
          if (typeof shapeLastClicked !== 'undefined') {
            if (scope.editMode) {
              drawFrameOn(shapeLastClicked, 'makeNew');
            }
            else {
              shapeLastClicked.removeSegments();
              shapeLastClicked.frame.remove();
            }
          }
        }

        //draw the image
        var drawImage = function( image ){

          //resize the image to max in the canvas
          var resizeRaster = function(){
            var rasterHeight = this.getHeight();
            var rasterWidth = this.getWidth();
            var scale = Math.max(rasterHeight/canvas.height, rasterWidth/canvas.width);

            if (scale <= 1) {
              this.setHeight(rasterHeight * scale);
              this.setWidth(rasterWidth * scale);
            }
            else {
              this.setHeight(rasterHeight / scale);
              this.setWidth(rasterWidth / scale);
            }
          }

          var raster = new paper.Raster(image.src);
          raster.type = 'main-image';
          raster.onLoad = resizeRaster;
          raster.position = paper.view.center;
          raster.onClick = function(event){
            if (typeof shapeLastClicked !== 'undefined') {
              shapeLastClicked.style = styleStandard;
              shapeLastClicked.active = false;
              if (shapeLastClicked.frame) {
                shapeLastClicked.removeSegments();
                shapeLastClicked.frame.remove();
              }
            }

            if (scope.editMode) {
              if (scope.showDropdown){
              // console.log(scope.dropDownMenu);
                scope.drawDropdown(event);
                scope.showDropdown = false;
              }
              else {
                scope.hideDropdown();
                scope.showDropdown = true;
              }
          }
        }
      }

        var findAngle = function (centerPoint, rotatePoint, eventPoint ){
          var findDistance = function(point1, point2){
            return ( (point1.x-point2.x)*(point1.x-point2.x) + (point1.y-point2.y)*(point1.y-point2.y) );
          }
          var centerToRotate = findDistance(centerPoint, rotatePoint);
          var centerToEvent = findDistance(centerPoint, eventPoint);
          var rotateToEvent = findDistance(rotatePoint, eventPoint);

          var angle = Math.acos((centerToRotate + centerToEvent - rotateToEvent)/ (2 * Math.sqrt(centerToRotate) * Math.sqrt(centerToEvent) ) ) * 180 / Math.PI;
          return angle;
          // if (eventPoint.x < rotatePoint.x t)
        }

        var drawFrameOn = function(shape, updateType){
            // shape.bounds.selected = true; 
            // console.log(shape.bounds);
                    // console.log(b);
            // b.selected = true;
    
            // selectionRectangle = new Path.Rectangle(b);
            var drawPath = function(shape){
              var b = shape.bounds.clone().expand(5,5);
              shape.frame = new paper.Path.Rectangle(b);
              shape.frame.strokeWidth = 1;
              shape.frame.strokeColor = 'blue';
              shape.frame.insert(2, new paper.Point(b.center.x, b.top));
              shape.frame.insert(2, new paper.Point(b.center.x, b.top-15));
              shape.frame.insert(2, new paper.Point(b.center.x, b.top));
            }
            // shape.frame.selected = true;
            // shape.frame.topLeft.onMouseEnter = function() {
            //   console.log("i am zero");
            // };

            var drawSegments = function(shape) {
              shape.frame.bottomLeftSegment = new paper.Path.Rectangle({
                x: shape.frame.segments[0].point.x - 2.5,
                y: shape.frame.segments[0].point.y - 2.5,
                width: 5,
                height: 5,
                fillColor: 'white',
                strokeColor: 'blue',
                strokeWidth: 1,
                onMouseDrag : function(event){
                  shape.bounds.setBottomLeft(event.point);
                  drawFrameOn(shape, 'updateAll');
                }
              });
              shape.frame.topLeftSegment = new paper.Path.Rectangle({
                x: shape.frame.segments[1].point.x - 2.5,
                y: shape.frame.segments[1].point.y - 2.5,
                width: 5,
                height: 5,
                fillColor: 'white',
                strokeColor: 'blue',
                strokeWidth: 1,
                onMouseDrag : function(event){
                  shape.bounds.setTopLeft(event.point);
                  drawFrameOn(shape, 'updateAll');
                }
              });
              shape.frame.topRightSegment = new paper.Path.Rectangle({
                x: shape.frame.segments[5].point.x - 2.5,
                y: shape.frame.segments[5].point.y - 2.5,
                width: 5,
                height: 5,
                fillColor: 'white',
                strokeColor: 'blue',
                strokeWidth: 1,
                onMouseDrag : function(event){
                  shape.bounds.setTopRight(event.point);
                  drawFrameOn(shape, 'updateAll');
                }
              });
              shape.frame.bottomRightSegment = new paper.Path.Rectangle({
                x: shape.frame.segments[6].point.x - 2.5,
                y: shape.frame.segments[6].point.y - 2.5,
                width: 5,
                height: 5,
                fillColor: 'white',
                strokeColor: 'blue',
                strokeWidth: 1,
                onMouseDrag : function(event){
                  shape.bounds.setBottomRight(event.point);
                  drawFrameOn(shape, 'updateAll');
                }
              });
              // var rotateAngle = 0;
              shape.frame.rotateSegment = new paper.Path.Rectangle({
                x: shape.frame.segments[3].point.x - 2.5,
                y: shape.frame.segments[3].point.y - 2.5,
                width: 5,
                height: 5,
                fillColor: 'white',
                strokeColor: 'blue',
                strokeWidth: 1,
                onMouseDrag : function(event){
                  // console.log(shape.bounds.center);
                  var rotateAngle=findAngle(shape.bounds.center, shape.frame.segments[3].point, event.point);
                  // if (shape.frame.topRightSegment.x < shape.frame.top
                  // console.log("drag");
                  // console.log(rotateAngle);
                  shape.rotate(rotateAngle);
                  shape.frame.rotate(rotateAngle);

                  drawFrameOn(shape, 'updateSegments');
                  shape.frame.bottomRightSegment.rotate(rotateAngle);
                  shape.frame.bottomLeftSegment.rotate(rotateAngle);
                  shape.frame.topRightSegment.rotate(rotateAngle);
                  shape.frame.topLeftSegment.rotate(rotateAngle);
                  shape.frame.rotateSegment.rotate(rotateAngle);
                },
              });
            }

            var removeSegments = function (){
              shape.frame.bottomLeftSegment.remove();
              shape.frame.bottomRightSegment.remove();
              shape.frame.topLeftSegment.remove();
              shape.frame.topRightSegment.remove();
              shape.frame.rotateSegment.remove();
            }

            shape.removeSegments = removeSegments;

            if (updateType === 'makeNew'){
              drawPath(shape);
              drawSegments(shape);
            }
            else if (shape.frame && updateType === 'updateAll'){
              removeSegments(shape);
              shape.frame.remove();
              drawPath(shape);
              drawSegments(shape);
            }
            else if (shape.frame && updateType === 'updateSegments'){
              removeSegments(shape);
              drawSegments(shape);
            }

          };
        

        //draw shapes on the image/Raster
        scope.drawAnnotation = function( annotation ){

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

                if(point.x < shape.bounds || point.x > canvas.width - halfWidth || 
                  point.y < halfHeight || point.y > canvas.height - halfHeight)
                  return false;

                return true;
              }

              if (scope.editMode && dragBound(event.point,shape)){
                // console.log(shape.frame);
                shape.position = event.point;
                drawFrameOn(shape, 'updateAll');
                // shape.frame.updateFramePosition();
              }
            }

            //give an active effect when shape is clicked, show frame only when editMode is true
            //shapeLastClicked is a 'global' variable to determine which shape was last clicked
            var mouseClickEffect = function(event, shape) {
              // console.log(event.event.which);
              // event.preventDefault();
              if (typeof shapeLastClicked !== 'undefined' && shapeLastClicked !== shape ){
                if (shapeLastClicked.type === 'pin') {
                    shapeLastClicked.style = stylePin;
                }
                else {
                  shapeLastClicked.style = styleStandard;
                }
                shapeLastClicked.active = false;
                if (scope.editMode){
                  shapeLastClicked.removeSegments();
                  shapeLastClicked.frame.remove();
                  // shapeLastClicked.frame.toggleVisibility(false);
                }
              }
              shapeLastClicked = shape;

              shape.active = true;

              shape.style = styleActive;
              scope.hideDropdown();
              scope.showDropdown = false;
              // scope.showDropDown = true;

              //show the text corresponding to the shape
              scope.$apply(function() {
                scope.annotationText = shape.text;
              });

              if (scope.editMode){
                if (event.event.which === 3){ //right click event
                  scope.drawDropdown(event, shape);
                }
                if (!shape.frame){
                  drawFrameOn(shape, 'makeNew');
                }
                else {
                  drawFrameOn(shape, 'updateAll');
                }
              }
              // return false;
            }

            // var mouseRightClickEffect = function(event, shape) {
            //   console.log("rightclick");
            //   mouseLeftClickEffect(event, shape);
            //   if (scope.editMode){
            //     scope.drawDropdown(event, shape);
            //   }
            // }
            // console.log(shape);

            //override the mouse actions of shape
            shape.onMouseDrag   = function(event) { mouseDragEffect  ( event, shape ) };
            shape.onMouseEnter  = function() { mouseEnterEffect ( shape ) };
            shape.onMouseLeave  = function() { mouseLeaveEffect ( shape ) };
            shape.onClick       = function(event) {mouseClickEffect ( event, shape); return false;}
            // shape.oncontextmenu = function(event) { mouseRightClickEffect ( event, shape) };

          };
          //end mouseActionsOn


          var drawCircle = function( shape ){
            var circle;
            if (typeof shape.radius === 'undefined'){
              circle = new paper.Path.Circle({
                radius: 50,
                style: styleStandard,
              });
            }
            else {
              circle = new paper.Path.Circle({
                radius: shape.radius,
                style: styleStandard,
              });
            }
            return circle;
          };

          var drawRect = function( shape ){
            var rect;
            if (typeof shape.width === 'undefined' || typeof shape.height === 'undefined'){
              rect = new paper.Path.Rectangle({
                width: 70,
                height: 70,
                style: styleStandard
              });
            }
            else {
              rect = new paper.Path.Rectangle({
                width: shape.width,
                height: shape.height,
                style: styleStandard
              });
            }
            return rect;
          };

          var drawEllipse = function( shape ){
            var ellipse;
            if (typeof shape.width === 'undefined' || typeof shape.height === 'undefined'){
              ellipse = new paper.Path.Ellipse({
                width: 70,
                height: 50,
                style: styleStandard
              });
            }
            else {
              ellipse = new paper.Path.Ellipse({
                width: shape.width,
                height: shape.height,
                style: styleStandard
              });
            }
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
            mouseActionsOn(shape);
            return shape;
          }
          //shape is unidentified
          else{
            console.log('Shape' + annotation.type + 'is unidentified');
          }

        };
        //end drawAnnotations

        //wrapper function to draw image, annotation, frame, and the implement the mouse actions on the shapes
        var drawAll = function(image){
          if (typeof image !== 'undefined') {
            drawImage(image);
            image.annotations.forEach(function(annotation){
              scope.drawAnnotation(annotation);
            });
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
                drawAll(image[0]);
            }
        });

        //setup canvas
        init();
        
      }
    };
  });