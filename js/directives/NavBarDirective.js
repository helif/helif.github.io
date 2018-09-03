'use strict';

/**
 * NavBar Directive
 * Displays the input and search button to perform a search
 */
angular.module("mainApp").directive('navbarDirective', ['flickrService', function(flickrService) {
    return {
        restrict: 'E',
        replace: false,
        templateUrl:'js/directives/NavBarTemplate.html',
        scope: {
            tags: '=',
            list: '='
        },
        link: navbarLink,
        controller: navbarController
    }

    /**
     * Link function
     * Initialising scope variables
     */
    function navbarLink($scope) {
        $scope.searching = false;
    }
    
    /**
     * Controller function
     */
    function navbarController($scope, flickrService) {

        $scope.search = function() {
            $scope.searching = true;

            flickrService.getFeed($scope.tags, function(data) {
                $scope.list = data.items; 
                $scope.searching = false;
            }, function() {
                // There was an problem with the request
                $scope.list = [];
                $scope.searching = false;
            });
          }
    }
}]);