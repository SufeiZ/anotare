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
    scope: {
      offset: "@offsetParallax",
      direction: "@directionParallax",
    },
    link: function(scope, element, attribute, event) {
      var currentMousePos = { x: -1, y: -1 };
      var initialMarginTop = Number(element.css("margin-top").replace(/[^-\d\.]/g, ''));
      var initialMarginLeft = Number(element.css("margin-left").replace(/[^-\d\.]/g, ''));
      var widthElement = Number(element[0].style.width.replace(/[^-\d\.]/g, ''));
      var heightElement = Number(element[0].style.height.replace(/[^-\d\.]/g, ''));
      console.log(scope.direction);

      var centerV = $(window).height() - heightElement/2 + 10;
      var centerH = $(window).width() - widthElement/2;
      // var eLeft = element.offset().left + element.width()/2;
      // console.log(element[0].style.width);
      // $(window).height();
      // $(window).width();

      $(document).mousemove(function(event) {
          currentMousePos.x = event.pageX;
          currentMousePos.y = event.pageY;
          // console.log(initialMarginTop + Math.abs(currentMousePos.x - centerH) / centerH * 7);
          if (scope.direction === 'reverse'){
            var marginTop =  initialMarginTop - (currentMousePos.y - centerV) / centerV * scope.offset;
            var marginLeft = initialMarginLeft - (currentMousePos.x - centerH) / centerH * scope.offset;
          }
          else {
            var marginTop =  initialMarginTop + (currentMousePos.y - centerV) / centerV * scope.offset;
            var marginLeft = initialMarginLeft + (currentMousePos.x - centerH) / centerH * scope.offset;
          }
          // console.log(initialMarginTop);
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