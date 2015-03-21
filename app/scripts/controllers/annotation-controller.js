'use strict';

/**
 * @ngdoc function
 * @name anotareApp.controller:AnnotationCtrl
 * @description
 * # AboutCtrl
 * Controller of the anotareApp
 */
angular.module('anotareApp')
  .controller('AnnotationCtrl', function ($scope, $http, AlbumService) {
  	// $scope.album = AlbumService;
    $scope.image={};

    // Call the async method and then do stuff with what is returned inside the function
    $scope.updateImage = function() {
      AlbumService.getImage()
        .then(
        //success function
        function (asyncImageData) {
            $scope.image = asyncImageData;
        },
        //error function
        function(result) {
          console.log("Failed to get the image, result is " + result); 
        });
    };

    $scope.updateImage();

    // // We can also use $watch to keep an eye out for when $scope.avengers.cast gets populated
    // $scope.$watch('avengers.cast', function (cast) {
    //     // When $scope.avengers.cast has data, then run these functions
    //     if (angular.isDefined(cast)) {          
    //         $log.info("$scope.avengers.cast has data");
    //     }
    // });
  });
