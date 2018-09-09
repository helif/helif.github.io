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
            list: '<'
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
        $scope.view = {
            visible: false,
            gridInputPlaceHolder: "Enter filter"
        };
        $scope.data  = {};
    }
 
    /**
     * Controller function
     * Defines scope binding methods
     */
    function gridController($scope, flickrService, $timeout, $window) {
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

        // formats the image published date
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
            return $scope.data && $scope.data.results && !_.isEmpty($scope.data.results);
        };

        $scope.$watch('list', function(newValue, oldValue) {
            setResults($scope, $scope.list);
        });

        // initialising controller
        init($scope);
    }

    /**
     * Initialises the controller - initial state
     * @param {directive isolated scope} $scope 
     */
    function init($scope) {
         flickrService.getFeed("", function(data) {
            setResults($scope, data.items);
            $scope.view.visible = true;
        }, function() {
            // There was an problem with the request
            setResults($scope, []);
            $scope.view.visible = true;
        });
    }

    /**
     * Sets the results to display in the view
     * It also removes any existing in data.filter
     * @param {directive isolated scope} $scope 
     * @param {current search results} results 
     */
    function setResults($scope, results) {
        $scope.data = {
            results: results
        };
    }
}]);
