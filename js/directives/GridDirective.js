'use strict';

/**
 * Flickr Grid Directive
 * Displays data from the flickr API.
 */
angular.module("mainApp").directive('gridDirective', ['flickrService', function(flickrService) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl:'js/directives/GridTemplate.html',
        scope: {
            tags: '=',
            list: '='
        },
        link: gridLink,
        controller: gridController
    }

    /**
     * Link function
     * Initialising scope variables
     */
    function gridLink($scope) {
        $scope.error = "Something went wrong with your request. Please refine your search.";
        $scope.visible = false;
    }
 
    /**
     * Controller function
     * Defines scope binding methods
     */
    function gridController($scope, flickrService) {
        var options = {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        }

        // formats the image title
        $scope.formatTitle = function(title) {
            return title && title.trim() ? title.trim() : "No Title";
        };

        // formats the image published data
        $scope.formatDate = function(date){
            if (date) {
                var newDate = new Date(date);
                if (_.isDate(newDate)) {
                    return newDate.toLocaleDateString("en-AU", options);
                }
            }

            return "Not Available";
        }

        $scope.hasResults = function() {
            return $scope.list && !_.isEmpty($scope.list);
        };

        // initialising controller
        init($scope);
    }

    /**
     * Initialises the controller - initial state
     * @param {directive isolated scope} $scope 
     */
    function init($scope) {
         flickrService.getFeed($scope.tags, function(data) {
            $scope.list = data.items;
            $scope.visible = true;
        }, function() {
            // There was an problem with the request
            $scope.list = [];
            $scope.visible = true;
        });
    }
}]);
