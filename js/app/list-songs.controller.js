angular.module("SureifyCokeStudio")
.controller("ListSongsController", ["$rootScope", "$scope", "$state", "CokeStudioService", "$window", function($rootScope, $scope, $state, CokeStudioService, $window){
	
	$scope.currentTrack = 0;
	$scope.songs = [];
	
	var updateTrack = function(){
		$rootScope.$broadcast('audio.set', $scope.songs[$scope.currentTrack], $scope.currentTrack, $scope.songs.length);
	};
	
	$rootScope.$on('audio.next', function(){
		$scope.currentTrack++;
		if ($scope.currentTrack < $scope.songs.length){
			updateTrack();
		}else{
			$scope.currentTrack=$scope.songs.length-1;
		}
    });

    $rootScope.$on('audio.prev', function(){
		$scope.currentTrack--;
		if ($scope.currentTrack >= 0){
			updateTrack();
		}else{
			$scope.currentTrack = 0;
		}
    });
	
	$rootScope.$on('audio.time', function(event, obj){
		var element = angular.element(obj);
		var progressBar = $('.progressbar');
		var value = (element[0].currentTime / element[0].duration) * 100;
		progressBar.stop(true, true).animate({'width': value + '%'}, 500);
	});
	
	$rootScope.$on('audio.like', function(){
		CokeStudioService.userHistory.push({
			"Activity": "Like",
			"song": {
				img: $scope.songs[$scope.currentTrack].cover_image,
				title: $scope.songs[$scope.currentTrack].song,
				url: $scope.songs[$scope.currentTrack].url,
				date: new Date()
			}
		});
		$scope.songs[$scope.currentTrack].isLiked = true;
		$rootScope.$broadcast('audio.liked', this);
	});
	
	$rootScope.$on('audio.dislike', function(){
		CokeStudioService.userHistory.push({
			"Activity": "Dislike",
			"song": {
				img: $scope.songs[$scope.currentTrack].cover_image,
				title: $scope.songs[$scope.currentTrack].song,
				url: $scope.songs[$scope.currentTrack].url,
				date: new Date()
			}
		});
		$scope.songs[$scope.currentTrack].isLiked = false;
		$rootScope.$broadcast('audio.disliked', this);
	});
	
	if(CokeStudioService.songs.length > 0){
		$scope.songs = CokeStudioService.songs;
	}else{
		CokeStudioService.getSongs().then(function(songs){
			angular.forEach(songs, function(song, index){
				song.isLiked = false;
			});
			CokeStudioService.songs = songs;
			$scope.songs = songs;
			updateTrack();
		}, function(error){
			if(error){
				$scope.errorMessage = error;
			}
		});
	}
	
	$rootScope.$on('audio.download', function(){
		CokeStudioService.userHistory.push({
			"Activity": "Download",
			"song": {
				img: $scope.songs[$scope.currentTrack].cover_image,
				title: $scope.songs[$scope.currentTrack].song,
				url: $scope.songs[$scope.currentTrack].url,
				date: new Date()
			}
		});
	});
	
}]);