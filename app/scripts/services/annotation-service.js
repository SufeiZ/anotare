'use strict';
/**
 * @ngdoc function
 * @name anotareApp.factory:Album
 */

angular.module('anotareApp')
  .factory('Album', function () {
    var Album =
    [
        {
            src: 'images/picasso.jpg',
            annotations:[
            				{
            					type:'circle',
            					x: '100',
            					y: '100',
            					radius: '30'
            				},
            				{
            					type:'rectangle',
            					x: '150',
            					y: '150',
            					height: '20',
            					width: '50'
            				},
            				{
            					type:'ellipse',
            					x: '170',
            					y: '200',
            					height: '10',
            					width: '5'
            				},
            				{
            					type:'circle',
            					x: '50',
            					y: '100',
            					radius: '60'
            				}
            			]
        }
    ];

    return Album;
});