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

      var $dropdown = $("#dropdown-context");

      scope.showDropDownMenu = function(ev){
        console.log(ev.event);
        $dropdown.css({
          top: ev.event.y + "px", 
          left: ev.event.x + "px", 
          display: "block"
        });
      };

      scope.hideDropDownMenu = function(){
        $dropdown.css({
          display: "none"
        });
      };

      scope.dropdownClick = function(index){
        console.log(scope.toolIcons[index].name);
      }
    }
  };
})