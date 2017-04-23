angular.module("SureifyCokeStudio")
.factory("CokeStudioService", ["$http", "$q", function($http, $q){
	
	var cokeStudioService = {};
	
	cokeStudioService.userHistory = [];
	
	cokeStudioService.songs = [];
	
	cokeStudioService.getSongs = function(){
		var defer = $q.defer();
		$http.get("http://starlord.hackerearth.com/sureify/cokestudio")
			.then(function(response){
				defer.resolve(response.data);
			}, function(error){
				defer.reject(error.data);
			});
		return defer.promise;
	};
	
	return cokeStudioService;
	
}]);