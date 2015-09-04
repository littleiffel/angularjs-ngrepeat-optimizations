'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'sf.virtualScroll'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/view1'});
    }]).controller('myController', ['$scope', function ($scope) {
        $scope.framework = 'ReactJs';
        $scope.data = [];
        // Fill the data map with random data

        $scope.refresh = function () {
            var t = new Date().getTime();
            for (var i = 0; i < 10000; ++i) {
                /*$scope.data[i] = {};
                for(var j = 0; j < 5; ++j) {
                    $scope.data[i][j] = Math.random();
                }
                $scope.data[i] = {};*/
                var tmp = [];
                for (var j = 1; j < 6; ++j) {
                    tmp.push(Math.random());
                }
                $scope.data[i] = {id: i, values:tmp};
            }
        }
        $scope.refresh()
    }]).directive('fastRepeat', function(){
        return{
            restrict: 'E',
            scope:{
                data: '='
            },
            link:function(scope, el, attrs){
                scope.$watchCollection('data', function(newValue, oldValue){
                    React.render(
                        React.createElement(MYLIST, {data:newValue}),
                        el[0]
                    );
                })
            }
        }
    });
