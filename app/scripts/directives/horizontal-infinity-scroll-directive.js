'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */

angular.module('anotareApp')
.directive('horizontalInfinityScroll', function () {
    return {
        restrict : 'EA',
        //TODO : use local scope variables instead of polluting the global scope
        link: function(scope, element, attribute) {

            scope.items = [];
            var lastImageIndex = 0;
            var allImagesLoaded = false;
            var firstLoad = true;
            var raw = element[0];


            scope.loadMore = function() {
                for (var i = 0; i < 5; i++) {
                    scope.items.push(scope.imageScope[lastImageIndex]);
                    lastImageIndex++;
                    if (lastImageIndex >= scope.imageScope.length){
                        lastImageIndex = 0;
                        // allImagesLoaded = true;
                    }
                }
            };

            //move to next photo, or first photo if it's the last photo
            scope.scrollRight = function () {
                raw.scrollLeft += 200;
            };
            //move to previous photo, or last photo if it's the first photo
            scope.scrollLeft = function () {
                raw.scrollLeft -= 200;
            };

            scope.getImage();
            scope.$watch('imageScope', function(newVal, oldVal) {
                if (typeof newVal !== 'undefined' && newVal.length > 0 && firstLoad)
                {   
                    firstLoad = false;
                    scope.loadMore();
                }
            });


            element.bind('scroll', function() {
                if (raw.scrollLeft + raw.offsetWidth >= raw.scrollWidth) {
                    scope.$apply(attribute.horizontalInfinityScroll);
                }
            });



        }
    };
});


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
