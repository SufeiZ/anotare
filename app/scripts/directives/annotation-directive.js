'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */
 
anotare.directive('display-annotation', function () {
    return {
        restrict : 'E',
        replace : true,
        template :  '<canvas> <img class=annotation-image src={{artwork.image}}' +
                        '<div ng-repeat=annotation in artwork.annotations>' +
                            '<div class=annotation-shape ng-click=showText(annotation.text)> {{annotation.shape}} </div>' +
                        '</div>' +
                    '</canvas>' +
                    '<div id=annotation-text> /*push the text from the corresponding focused shape here*/ </div>'
                    ,
        link: function(scope) {
            scope.showText = function (text){
                document.getElementById('annotation-text').innerHTML = text;
            }
        }
    };
});