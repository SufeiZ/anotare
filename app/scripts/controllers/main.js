'use strict';

/**
 * @ngdoc function
 * @name anotareApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the anotareApp
 */
angular.module('anotareApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
