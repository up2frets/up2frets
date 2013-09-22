'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource']).
    factory('Item', function($resource){
  return $resource('phones/:phoneId.json', {}, {
    query: {method:'GET', params:{phoneId:'mp-links'}, isArray:true}
  });
});
