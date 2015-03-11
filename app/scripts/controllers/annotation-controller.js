'use strict';

/**
 * @ngdoc function
 * @name anotareApp.controller:AnnotationCtrl
 * @description
 * # AboutCtrl
 * Controller of the anotareApp
 */
angular.module('anotareApp')
  .controller('AnnotationCtrl', function ($scope, Album) {
    $scope.image = Album[0];
  });
