angular.module("IrregularVerbs", [])
.controller("IrregularVerbsCtrl", ["$scope", "$http", function($scope, $http) {

        $http.get("data.json").success(function(data, status, headers, config) {

        $scope.verbs = data;
        $scope.search = null;

        $scope.print = function () {
            window.print();
        }

        }).error(function(data, status, headers, config) {
            $scope.error = true;
        });
}]);