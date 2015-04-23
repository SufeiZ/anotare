'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */

angular.module('anotareApp')
.directive('photoSlider', function () {
    return {
        restrict : 'E',
        //TODO : use local scope variables instead of polluting the global scope
        link: function(scope) {
            scope.currentIndex = 0;

            //move to next photo, or first photo if it's the last photo
            scope.next = function () {
                scope.imageScope[scope.currentIndex].visible = false;
                scope.currentIndex = scope.currentIndex < scope.imageScope.length - 1 ? scope.currentIndex + 1 : 0;
                scope.imageScope[scope.currentIndex].visible = true;
            };
            //move to previous photo, or last photo if it's the first photo
            scope.prev = function () {
                scope.imageScope[scope.currentIndex].visible = false;
                scope.currentIndex = scope.currentIndex > 0 ? scope.currentIndex - 1  : scope.imageScope.length - 1;
                scope.imageScope[scope.currentIndex].visible = true;
            };

            //update index (if it goes out of bounds) after the imageScope array modified
            scope.updateCurrentIndexAfterSearch = function () {
                if (scope.currentIndex > scope.imageScope.length - 1)
                {
                    scope.currentIndex = scope.imageScope.length - 1;
                }
            };

            scope.$watch('imageScope', function(newVal, oldVal) {
                if (typeof newVal !== 'undefined' && newVal.length > 0)
                {   
                    angular.forEach(newVal, function(image) {
                        image.visible = false; // make every image invisible
                    });
                    newVal[scope.currentIndex].visible = true;
                }
            });

            scope.getImage();

            // //update the slide if there is any changes to the array imageScope
            // scope.$watchCollection('imageScope', function(newVal, oldVal) {

            //     //if the old imageScope array is empty, then set the current index to 0
            //     if (typeof oldVal === 'undefined' || oldVal.length <= 0)
            //     {   
            //         scope.currentIndex = 0 ;
            //         scope.updateSlide();
            //     }
            //     //if the current photo displayed is not included in the new array imageScope
            //     else if (newVal.indexOf(oldVal[scope.currentIndex]) === -1)
            //     {  
            //         angular.forEach(oldVal, function(image) {
            //             image.visible = false; // make every image invisible
            //         });
            //         scope.currentIndex = 0;
            //         scope.updateSlide();
            //     }
            // });
        }
    };
});