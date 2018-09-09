(function() {

  "use strict";
  
  var mainApp = angular.module("mainApp", ['ngResource']);

  mainApp.controller("MainController", ['$scope', function($scope) {
    $scope.tags = "";
    $scope.list = [];
  }]);

}());