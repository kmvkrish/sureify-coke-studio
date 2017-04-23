angular.module("SureifyCokeStudio")
.directive("audioPlayer", ["$rootScope", function($rootScope){
	return {
		
		restrict: 'E',
		scope: {},
		templateUrl: 'audio-player.html',
		controller: function($scope, $element){
			//create new Audio element;
			$scope.audio = new Audio();
			
			//set Current track details
			$scope.currentNum = 0;
			
			//add previous and next controls
			$scope.next = function(){
				$rootScope.$broadcast('audio.next');
			};
			$scope.prev = function(){
				$rootScope.$broadcast('audio.prev');
			};
			
			$scope.playpause = function(){
				var a = $scope.audio.paused? $scope.audio.play(): $scope.audio.pause();
			}
			
			//register event listeners on audio element
			$scope.audio.addEventListener('play', function(){
				$rootScope.$broadcast('audio.play', this);
			});
			
			$scope.audio.addEventListener('pause', function(){
				$rootScope.$broadcast('audio.pause', this);
			});
			
			$scope.audio.addEventListener('timeupdate', function(){
				$rootScope.$broadcast('audio.time', this);
			});
			
			$scope.audio.addEventListener('ended', function(){
				$rootScope.$broadcast('audio.ended', this);
				$scope.next();
			});
			
			//set track and play it
			$rootScope.$on('audio.set', function(r, song, currentNum, totalNum){
				var isPaused = $scope.audio.paused;
				
				$scope.isLiked = song.isLiked;
				$scope.downloadLink = song.url;
				$scope.audio.src = song.url;
				var a = isPaused? $scope.audio.play(): null;
				$scope.artists = song.artists;
				$scope.image = song.cover_image;
				$scope.title = song.song;
				
				$scope.currentNum = currentNum;
				$scope.totalNum = totalNum;
			});
			
			setInterval(function(){
				$scope.$apply();
			}, 1000);
			
			//register like, unlike, download events
			$scope.like = function(){
				$rootScope.$broadcast('audio.like', this);
			};
			
			$scope.unlike = function(){
				$rootScope.$broadcast('audio.dislike', this);
			};
			
			$rootScope.$on('audio.liked', function(){
				$scope.isLiked = true;
			});
			
			$rootScope.$on('audio.disliked', function(){
				$scope.isLiked = false;
			});
			
			$scope.download = function(){
				$rootScope.$broadcast('audio.download', this);
			};
			
		}
		
	};
}]);