angular.module("SureifyCokeStudio")
.controller("ActivityHistoryController", ["$rootScope", "$scope", "$state", "CokeStudioService", function($rootScope, $scope, $state, CokeStudioService){

	$scope.activityHistory = CokeStudioService.userHistory;

}]);