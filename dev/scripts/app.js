angular.module("IrregularVerbs", [])
.controller("IrregularVerbsCtrl", function($scope, $http) {

        $http.get("/data.json").success(function(data, status, headers, config) {

        $scope.verbs = data;
        $scope.search = null;


        }).error(function(data, status, headers, config) {
            $scope.error = true;
        });
});