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
            					x: '350',
            					y: '300',
            					radius: '300'
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
            					height: '30',
            					width: '15'
            				},
            				{
            					type:'circle',
            					x: '200',
            					y: '400',
            					radius: '60'
            				},
                            {
                                type:'pin',
                                x: '300',
                                y: '300'
                            }
            			]
        }
    ];

    return Album;
});