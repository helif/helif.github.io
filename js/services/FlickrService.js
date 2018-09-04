'use strict';

/**
 * FlickrService
 * Sends requests to the Flickr photo feed API.
 */
angular.module("mainApp").service('flickrService', ['$http', function($http) {
  var resource = {
    getFeed: {
      url: "https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&lang=en-us&tagmode=ANY&safe_search=1&tags=children,"
    }
  }

  var service = {
    /**
     * Performs the API requests and passes the response to the onSuccess callback 
     */
    getFeed: function(tags, onSuccess, onFailure) {
      $http.jsonp(resource.getFeed.url + tags).then(
        function(response){
          // console.log(response);
          if (_.isFunction(onSuccess) && response && response.data) {
              onSuccess(response.data);
          }
        },
        function() {
          if (_.isFunction(onFailure)) {
            onFailure();
            console.log("Error loading Flickr Feed");
          }
        });
    }
  }

  return service;
}]);