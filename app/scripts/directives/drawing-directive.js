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

      var $canvas = $("#main-canvas")
      var $dropdown = $("#dropdown-context");

      $canvas.bind("click", function(event){
        event.preventDefault();

        // if($dropdown.css("display") == "block"){
        //   console.log("block");
        //   $dropdown.css({display:"none"});
        // } 

        $dropdown.css({
          top: event.pageY + "px", 
          left: event.pageX + "px", 
          display: "block"});
      });

      scope.dropdownClick = function(index){
        console.log(scope.toolIcons[index].name);
      }
    }
  };
})