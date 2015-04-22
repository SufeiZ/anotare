'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */

 angular.module('anotareApp')
.directive('parallax', function () {
  return {
    restrict: 'A',
    replace : true,
    link: function(scope, element, attribute, event) {
      var currentMousePos = { x: -1, y: -1 };
      var initialMarginTop = element.css("margin-top").replace(/[^-\d\.]/g, '');
      var initialMarginLeft = element.css("margin-left").replace(/[^-\d\.]/g, '');
      console.log(initialMarginTop);
      // $(window).height();
      // $(window).width();

      $(document).mousemove(function(event) {
          currentMousePos.x = event.pageX;
          currentMousePos.y = event.pageY;
          var marginTop =  initialMarginTop - currentMousePos.x / $(window).width() * 7;
          var marginLeft = initialMarginLeft - currentMousePos.y / $(window).height() * 7;

          element.css({
            "margin-top": marginTop + "px",
            "margin-left": marginLeft + "px"
          });
      });
      // console.log(mouse.getLocation());
      // var marginTop = element.css("margin-top");
      // var marginLeft = element.css("margin-left");

    }
  };
})