'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http) {
  $http.get('data/mp-links.json').success(function(data) {
    $scope.items = data;
  });
 
  $scope.orderProp = 'age';
}