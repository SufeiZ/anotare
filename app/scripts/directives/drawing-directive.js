'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */

 angular.module('anotareApp')
.directive('dropTool', function () {
  return {
    restrict: 'E',
    replace : true,
    templateUrl:'views/dropdown.html',
    link: function(scope, element, attribute, event) {
      var newAnnotation, newShape, oldShape;
      var $dropdown = $("#dropdown-context");
      var confirmDraw = false;
      var isNewShape;
      // scope.newText = "";
      // console.log(scope.paper);
      scope.drawDropdown = function(ev, shape){
        $dropdown.css({
          top: ev.event.y + "px", 
          left: ev.event.x + "px", 
          display: "block",
          zIndex: 1001
        });

        if (typeof shape === 'undefined'){
          isNewShape = true;
           newAnnotation = {
                            "type":"pin",
                            "x": ev.point.x,
                            "y": ev.point.y,
                            "text": ""
                          }
          newShape = scope.drawAnnotation(newAnnotation);
          scope.$apply(function() {
            scope.annotationText = newShape.text;
          });
        }
        else {
          isNewShape = false;
          newShape = shape;
          oldShape = shape;
          scope.newText = shape.text;
          console.log(shape.type);
        }
      };

      scope.hideDropdown = function(){
        $dropdown.css({
          display: "none"
        });
        if (!confirmDraw && isNewShape && typeof newShape !== 'undefined'){
          newShape.remove();
          
        }
        else {
          //shape has been drawn, reset confirmDraw and newShape
          confirmDraw = false;
          newShape = undefined;
        }
      };

      scope.submitNewAnnotation = function() {
        //check if the fieldtext is not empty
        if (scope.newText.trim() !== ""){
          confirmDraw = true;
          newShape.text = scope.newText;
          scope.hideDropdown();
          scope.showDropdown = true;
        }
        else {
          console.log("you have to write on the input field to submit a new annotation");
        }
      }

      scope.cancelNewAnnotation = function() {
        scope.hideDropdown();
        scope.showDropdown = true;
      }

      scope.dropdownClick = function(index){
        var origX = newShape.position.x;
        var origY = newShape.position.y;
        newShape.remove();
        var newText;
        if (isNewShape){
          newText = "";
        }
        else {
          newText = oldShape.text;
        }
        if (scope.toolIcons[index].name === 'circle-tool'){
          newAnnotation = 
          {
            "type":"circle",
            "x": origX,
            "y": origY,
            "text": newText
          }
        }
        else if (scope.toolIcons[index].name === 'square-tool'){
          newAnnotation = 
          {
            "type":"rectangle",
            "x": origX,
            "y": origY,
            "text": newText
          }
        }
        newShape = scope.drawAnnotation(newAnnotation);

      }
    }
  };
})