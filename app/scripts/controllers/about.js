'use strict';

/**
 * @ngdoc function
 * @name anotareApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the anotareApp
 */
angular.module('anotareApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
