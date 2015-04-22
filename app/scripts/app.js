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
  $urlRouterProvider.otherwise('/');
  //
  // Now set up the states
  $stateProvider
    .state('welcome', {
      url: '/',
      templateUrl: 'views/welcome.html'//,
      //controller: 'WelcomeCtrl'
    })

    .state('root', {
      url: '/main',
      templateUrl: 'views/root.html'
    })
      .state('root.explore', {
        url: '/explore',
        templateUrl: 'views/explore.html'//,
        //controller: 'ExploreCtrl'
      })
      .state('root.annotation', {
        url: '/annotation',
        templateUrl: 'views/annotation.html',
        controller: 'AnnotationCtrl'
      });

});

