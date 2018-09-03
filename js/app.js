(function() {

  "use strict";
  
  var mainApp = angular.module("mainApp", []);

  mainApp.controller("MainController", ['$scope', function($scope) {
    $scope.message = "Flickr Search";
    $scope.tags = "";
    $scope.list = [];
  }]);

}());