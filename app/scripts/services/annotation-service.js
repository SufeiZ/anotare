'use strict';
/**
 * @ngdoc function
 * @name anotareApp.factory:Album
 */ 

angular.module('anotareApp')
  .factory('AlbumService', function ($http) {
    var AlbumService = {
        getImage: function() {
            return $http.get('data/data.json').
              success(function(data) {
                // console.log(data);
                return data.Album;
              }).
              error(function(data, status) {
                alert('Oh no! An error!' + status);
              });
        }
    }

    // console.log(Album);
    return AlbumService;
});
