'use strict';

/**
 * @ngdoc overview
 * @name anotareApp
 * @description
 * # anotareApp
 *
 * Main module of the application.
 */
angular
  .module('anotareApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ])
    .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/main');
  //
  // Now set up the states
  $stateProvider
    .state('index', {
      url: '/main',
      templateUrl: 'views/main.html'//,
      //controller: 'WelcomeCtrl'
    })

    .state('annotation', {
      url: '/annotation',
      templateUrl: 'views/annotation.html',
      controller: 'AnnotationCtrl'
    });

});

