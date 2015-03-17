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
            					x: 350,
            					y: 300,
            					radius: 30
            				},
            				{
            					type:'rectangle',
            					x: 250,
            					y: 350,
            					height: 50,
            					width: 90
            				},
            				{
            					type:'ellipse',
            					x: 170,
            					y: 200,
            					height: 30,
            					width: 15
            				},
            				{
            					type:'circle',
            					x: 200,
            					y: 400,
            					radius: 60
            				},
                            {
                                type:'pin',
                                x: 300,
                                y: 300
                            }
            			]
        }
    ];

    return Album;
});
