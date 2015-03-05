'use strict';
/**
 * @ngdoc function
 * @name anotare.directive:display-annotation
 */
 
anotare.directive('display-annotation', function () {
    return {
        restrict : 'E',
        replace : true,
        template :  "<canvas width='960' height='400'>" + 
                        "{{drawImage(artwork.image)}}" +
                        "<div ng-repeat = 'annotation in artwork.annotations'>" +
                            "{{drawAnnotation(annotation)}}" +
                        "</div>" +
                    "</canvas>" +
                    "<div id=annotation-text> /*push the text from the corresponding focused shape here*/ </div>",
        link: function(scope, element, attribute) {
            var w, h;
            init();

            var init = function() {
                canvas = document.getElementById("testCanvas");
                stage = new createjs.Stage(canvas);

                // enable touch interactions if supported on the current device:
                createjs.Touch.enable(stage);

                // enabled mouse over / out events
                stage.enableMouseOver(10);
                stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
            }

            var drawImage = function( image ){

                   //TODO: draw image

            }

            var drawAnnotation = function( annotation ){
                var liveShape = annotation.shape;
                if (scope.stage) {
                       scope.stage.autoClear = true;
                       scope.stage.removeAllChildren();
                       scope.stage.update();
                   } else {
                       scope.stage = new createjs.Stage(element[0]);
                   }
                   w = scope.stage.canvas.width;
                   h = scope.stage.canvas.height;

                   //TODO: draw liveShape

                   liveShape.on("click", function() {
                        showText(annotation.text);
                    });
            }

            var showText = function (text){
                document.getElementById('annotation-text').innerHTML = text;
            }
        }
    };
});