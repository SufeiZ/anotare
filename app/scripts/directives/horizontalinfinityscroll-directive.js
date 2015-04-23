'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */

angular.module('anotareApp')
.directive('horizontalInfinityScroll', function () {
    return {
        restrict : 'E',
        //TODO : use local scope variables instead of polluting the global scope
        link: function(scope) {

            scope.items = [];
            var lastImageIndex = 0;
            var allImagesLoaded = false;

            scope.loadMore = function(album) {
                for (var i = 0; i < 10 && !allImagesLoaded; i++) {
                    scope.items.push(album[lastImageIndex]);
                    lastImageIndex++;
                    if (lastImageIndex >= album.length){
                        allImagesLoaded = true;
                    }
                }
            };


            // //move to next photo, or first photo if it's the last photo
            // scope.scrollRight = function () {
            //     scope.imageScope[scope.currentIndex].visible = false;
            //     scope.currentIndex = scope.currentIndex < scope.imageScope.length - 1 ? scope.currentIndex + 1 : 0;
            //     scope.imageScope[scope.currentIndex].visible = true;
            // };
            // //move to previous photo, or last photo if it's the first photo
            // scope.scrollLeft = function () {
            //     scope.imageScope[scope.currentIndex].visible = false;
            //     scope.currentIndex = scope.currentIndex > 0 ? scope.currentIndex - 1  : scope.imageScope.length - 1;
            //     scope.imageScope[scope.currentIndex].visible = true;
            // };

            //update index (if it goes out of bounds) after the imageScope array modified
            // scope.updateCurrentIndexAfterSearch = function () {
            //     if (scope.currentIndex > scope.imageScope.length - 1)
            //     {
            //         scope.currentIndex = scope.imageScope.length - 1;
            //     }
            // };

            // scope.$watch('imageScope', function(newVal, oldVal) {
            //     if (typeof newVal !== 'undefined' && newVal.length > 0)
            //     {   
            //         angular.forEach(newVal, function(image) {
            //             image.visible = false; // make every image invisible
            //         });
            //         newVal[scope.currentIndex].visible = true;
            //     }
            // });

            scope.getImage();

        }
    };
});