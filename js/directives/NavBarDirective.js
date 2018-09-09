'use strict';

/**
 * NavBar Directive
 * Displays the input and search button to perform a search
 */
angular.module("mainApp").directive('navbarDirective', ['flickrService', function(flickrService) {
    return {
        restrict: 'E',
        replace: true,
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
        $scope.view = {
            searching: false,
            navbarTitle: "Flickr Search!",
            navbarPlaceHolder: "Enter text"
        }
    }
    
    /**
     * Controller function
     */
    function navbarController($scope, flickrService, $window) {
    
        $scope.search = function() {
            $scope.view.searching = true;

            flickrService.getFeed($scope.tags, function(data) {
                $scope.list = data.items; 
                $scope.view.searching = false;
            }, function() {
                // There was an problem with the request
                $scope.list = [];
                $scope.view.searching = false;
            });
        }

        init($window);
    }

    /**
     * Initialises the controller - initial state
     * @param $window 
     */
    function init($window) {
        var element = $window.document.getElementById("navbar-input");
        if (element) { 
            element.focus();
        }
    }
}]);